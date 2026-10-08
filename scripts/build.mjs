#!/usr/bin/env node
/**
 * AxonCore Design System — build (zero dependencies, Node ≥ 18).
 * Source of truth: tokens/axoncore.tokens.json + src/.
 * Outputs everything under dist/:
 *   css/        tokens.css · fonts.css · typography.css · components.css · axoncore.css (all-in-one)
 *   tokens/     tokens.mjs · tokens.d.ts · tokens.resolved.json · dtcg/*.json (W3C DTCG for Figma/Tokens Studio)
 *   tailwind/   axoncore-preset.cjs (Tailwind v3) · axoncore-theme.css (Tailwind v4)
 *   react/      index.mjs (ESM) · axoncore.umd.js (window.AxonCore) · index.d.ts
 *   claude-design/ tokens.json (Design System artifact format)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = JSON.parse(fs.readFileSync(path.join(ROOT, "tokens/axoncore.tokens.json"), "utf8"));
const DIST = path.join(ROOT, "dist");
const out = (rel, text) => {
  const p = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text);
  console.log("  ✓ dist/" + rel);
};
const HEADER = "/* AxonCore Design System — generated from tokens/axoncore.tokens.json. Do not edit by hand. */\n";

const THEMES = SRC.color.themes.map((t) => t.id); // dark first
const PRIMARY = THEMES[0];
const colorTokens = SRC.color.tokens;
const byName = Object.fromEntries(colorTokens.map((t) => [t.name, t]));

const valueFor = (tok, theme) => (typeof tok.value === "string" ? tok.value : tok.value[theme] ?? tok.value[PRIMARY]);
const aliasOf = (v) => (typeof v === "string" && /^\{[^}]+\}$/.test(v) ? v.slice(1, -1) : null);
const cssVal = (v) => (aliasOf(v) ? `var(--${aliasOf(v)})` : v);
function resolve(name, theme, depth = 0) {
  const tok = byName[name];
  if (!tok || depth > 16) throw new Error(`Unresolvable color token: ${name}`);
  const v = valueFor(tok, theme);
  return aliasOf(v) ? resolve(aliasOf(v), theme, depth + 1) : v;
}
const varName = (n) => n.replace(/\./g, "\\.");

/* ── tokens.css ─────────────────────────────────────────────────────── */
function themeBlock(theme) {
  const lines = [];
  for (const t of colorTokens) {
    if (theme !== PRIMARY && typeof t.value === "string") continue;
    lines.push(`  --${varName(t.name)}: ${cssVal(valueFor(t, theme))};`);
  }
  for (const t of SRC.shadow.tokens) {
    if (theme !== PRIMARY && typeof t.value === "string") continue;
    lines.push(`  --${t.name}: ${typeof t.value === "string" ? t.value : t.value[theme]};`);
  }
  return lines.join("\n");
}
const staticFamilies = ["spacing", "radius", "gradient", "blur", "zIndex", "motion", "layout"];
const staticLines = [];
for (const fam of staticFamilies) for (const t of SRC[fam].tokens) staticLines.push(`  --${varName(t.name)}: ${t.value};`);
for (const [k, v] of Object.entries(SRC.type.families)) staticLines.push(`  --font-${k}: ${v};`);

const tokensCss =
  HEADER +
  `:root,\n[data-theme="${PRIMARY}"] {\n  color-scheme: ${PRIMARY};\n${themeBlock(PRIMARY)}\n}\n\n` +
  THEMES.slice(1)
    .map((th) => `[data-theme="${th}"] {\n  color-scheme: ${th};\n${themeBlock(th)}\n}\n\n@media (prefers-color-scheme: ${th}) {\n  [data-theme="auto"] {\n    color-scheme: ${th};\n${themeBlock(th).replace(/^/gm, "  ")}\n  }\n}\n`)
    .join("\n") +
  `\n:root {\n${staticLines.join("\n")}\n}\n`;
out("css/tokens.css", tokensCss);

/* ── fonts.css ──────────────────────────────────────────────────────── */
const face = (f, base) =>
  `@font-face {\n  font-family: "${f.family}";\n  src: url("${base}/${path.basename(f.file)}") format("woff2");\n  font-weight: ${f.weight};\n  font-style: ${f.style || "normal"};\n  font-display: swap;\n}\n`;
let fontsCss = HEADER + "/* Geist + Geist Mono — SIL Open Font License 1.1 (fonts/geist/OFL.txt) */\n";
fontsCss += SRC.type.fonts.map((f) => face(f, "../../fonts/geist")).join("");
const agrDir = path.join(ROOT, "fonts/agrandir");
const licensed = SRC.type.fontsLicensed.filter((f) => fs.existsSync(path.join(agrDir, path.basename(f.file))));
if (licensed.length) {
  fontsCss += "\n/* Agrandir — Pangram Pangram commercial web licence (fonts/agrandir/) */\n" + licensed.map((f) => face(f, "../../fonts/agrandir")).join("");
  console.log(`  · Agrandir webfonts found: ${licensed.length}/${SRC.type.fontsLicensed.length}`);
} else {
  fontsCss += "\n/* Agrandir webfonts not present: display styles fall back to Geist. See fonts/agrandir/README.md */\n";
  console.log("  · Agrandir webfonts not found → display falls back to Geist (see fonts/agrandir/README.md)");
}
out("css/fonts.css", fontsCss);

/* ── typography.css ─────────────────────────────────────────────────── */
const MOBILE = { "type-hero": "56px", "type-impact": "44px", "type-display": "40px", "type-h1": "32px", "type-metric": "48px", "type-quote": "26px" };
const UPPER = new Set(["type-stamp", "type-overline", "type-eyebrow"]);
const TABULAR = new Set(["type-metric", "type-data"]);
const NOLIGA = new Set(["type-code", "type-data", "type-eyebrow"]);
let typo = HEADER;
const typeStyles = [];
for (const g of SRC.type.groups)
  for (const s of g.styles) {
    const fam = s.family || g.family;
    typeStyles.push({ ...s, family: fam });
    const lh = typeof s.lineHeight === "number" ? s.lineHeight : s.lineHeight;
    typo += `.${s.name} {\n  font-family: var(--font-${fam});\n  font-size: ${s.fontSize};\n  line-height: ${lh};\n  font-weight: ${s.fontWeight};\n`;
    if (s.fontStyle) typo += `  font-style: ${s.fontStyle};\n`;
    if (s.letterSpacing) typo += `  letter-spacing: ${s.letterSpacing};\n`;
    if (UPPER.has(s.name)) typo += `  text-transform: uppercase;\n`;
    if (/^type-(hero|impact|display|h1|h2|quote)$/.test(s.name)) typo += `  text-wrap: balance;\n`;
    if (TABULAR.has(s.name)) typo += `  font-variant-numeric: tabular-nums;\n`;
    if (NOLIGA.has(s.name)) typo += `  font-variant-ligatures: none;\n`;
    typo += `}\n`;
  }
typo += `\n@media (max-width: 767px) {\n${Object.entries(MOBILE).map(([k, v]) => `  .${k} { font-size: ${v}; }`).join("\n")}\n}\n`;
out("css/typography.css", typo);

/* ── components.css + all-in-one ────────────────────────────────────── */
const compCss = fs.readFileSync(path.join(ROOT, "src/css/components.css"), "utf8");
out("css/components.css", compCss);
out("css/axoncore.css", HEADER + "/* All-in-one: fonts + tokens + typography + components */\n" +
  fontsCss.replace(HEADER, "") + "\n" + tokensCss.replace(HEADER, "") + "\n" + typo.replace(HEADER, "") + "\n" + compCss);

/* ── JS tokens ──────────────────────────────────────────────────────── */
const resolved = Object.fromEntries(THEMES.map((th) => [th, Object.fromEntries(colorTokens.map((t) => [t.name, resolve(t.name, th)]))]));
const flat = {
  themes: resolved,
  spacing: Object.fromEntries(SRC.spacing.tokens.map((t) => [t.name, t.value])),
  radius: Object.fromEntries(SRC.radius.tokens.map((t) => [t.name, t.value])),
  shadow: Object.fromEntries(THEMES.map((th) => [th, Object.fromEntries(SRC.shadow.tokens.map((t) => [t.name, typeof t.value === "string" ? t.value : t.value[th]]))])),
  gradient: Object.fromEntries(SRC.gradient.tokens.map((t) => [t.name, t.value])),
  motion: Object.fromEntries(SRC.motion.tokens.map((t) => [t.name, t.value])),
  layout: Object.fromEntries(SRC.layout.tokens.map((t) => [t.name, t.value])),
  zIndex: Object.fromEntries(SRC.zIndex.tokens.map((t) => [t.name, t.value])),
  fontFamily: SRC.type.families,
  typeStyles: Object.fromEntries(typeStyles.map((s) => [s.name, { fontFamily: SRC.type.families[s.family], fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: s.fontWeight, ...(s.letterSpacing && { letterSpacing: s.letterSpacing }), ...(s.fontStyle && { fontStyle: s.fontStyle }) }])),
};
out("tokens/tokens.resolved.json", JSON.stringify(flat, null, 2));
out("tokens/tokens.mjs", `${HEADER}export const tokens = ${JSON.stringify(flat, null, 2)};\n/** CSS custom property reference for any token name, e.g. cssVar("bg-canvas") → "var(--bg-canvas)". */\nexport const cssVar = (name) => \`var(--\${name})\`;\nexport default tokens;\n`);
out("tokens/tokens.d.ts", `export declare const tokens: {\n  themes: Record<${THEMES.map((t) => `"${t}"`).join(" | ")}, Record<${colorTokens.map((t) => `"${t.name}"`).join(" | ")}, string>>;\n  spacing: Record<string, string>; radius: Record<string, string>; shadow: Record<string, Record<string, string>>;\n  gradient: Record<string, string>; motion: Record<string, string>; layout: Record<string, string>; zIndex: Record<string, string>;\n  fontFamily: Record<string, string>; typeStyles: Record<string, Record<string, string | number>>;\n};\nexport declare const cssVar: (name: string) => string;\nexport default tokens;\n`);

/* ── DTCG (W3C Design Tokens) ───────────────────────────────────────── */
const dtcgAlias = (v) => (aliasOf(v) ? `{color.${aliasOf(v)}}` : v);
const primitives = { color: {} };
for (const t of colorTokens) if (typeof t.value === "string") primitives.color[t.name] = { $type: "color", $value: t.value, $description: t.usage };
const dim = (fam) => Object.fromEntries(SRC[fam].tokens.map((t) => [t.name, { $type: "dimension", $value: t.value, $description: t.usage || "" }]));
primitives.spacing = dim("spacing");
primitives.radius = dim("radius");
primitives.fontFamily = Object.fromEntries(Object.entries(SRC.type.families).map(([k, v]) => [k, { $type: "fontFamily", $value: v }]));
primitives.duration = Object.fromEntries(SRC.motion.tokens.filter((t) => t.name.startsWith("duration")).map((t) => [t.name, { $type: "duration", $value: t.value, $description: t.usage }]));
primitives.typography = Object.fromEntries(typeStyles.map((s) => [s.name, { $type: "typography", $value: { fontFamily: `{fontFamily.${s.family}}`, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing || "0" }, $description: s.usage }]));
out("tokens/dtcg/primitives.json", JSON.stringify(primitives, null, 2));
for (const th of THEMES) {
  const set = { color: {}, shadow: {} };
  for (const t of colorTokens) if (typeof t.value !== "string") set.color[t.name] = { $type: "color", $value: dtcgAlias(valueFor(t, th)), $description: t.usage };
  for (const t of SRC.shadow.tokens) set.shadow[t.name] = { $type: "shadow", $value: typeof t.value === "string" ? t.value : t.value[th], $description: t.usage };
  out(`tokens/dtcg/theme-${th}.json`, JSON.stringify(set, null, 2));
}

/* ── Tailwind ───────────────────────────────────────────────────────── */
const v = (n) => `var(--${varName(n)})`;
const pick = (prefix) => Object.fromEntries(colorTokens.filter((t) => t.name.startsWith(prefix)).map((t) => [t.name.slice(prefix.length), v(t.name)]));
const twColors = Object.fromEntries(colorTokens.map((t) => [t.name, v(t.name)]));
const tw = {
  theme: {
    extend: {
      colors: twColors,
      backgroundColor: pick("bg-"),
      textColor: pick("text-"),
      borderColor: { ...pick("border-") },
      outlineColor: { focus: v("focus-ring") },
      fontFamily: Object.fromEntries(Object.keys(SRC.type.families).map((k) => [k, v("font-" + k)])),
      fontSize: Object.fromEntries(typeStyles.map((s) => [s.name.replace("type-", ""), [s.fontSize, { lineHeight: String(s.lineHeight), fontWeight: String(s.fontWeight), ...(s.letterSpacing && { letterSpacing: s.letterSpacing }) }]])),
      spacing: Object.fromEntries(SRC.spacing.tokens.map((t) => [t.name.replace("space-", ""), v(t.name)])),
      borderRadius: Object.fromEntries(SRC.radius.tokens.map((t) => [t.name.replace("radius-", ""), v(t.name)])),
      boxShadow: Object.fromEntries(SRC.shadow.tokens.map((t) => [t.name.replace("shadow-", ""), v(t.name)])),
      backgroundImage: Object.fromEntries(SRC.gradient.tokens.map((t) => [t.name.replace("gradient-", ""), v(t.name)])),
      backdropBlur: { glass: v("blur-glass"), "glass-strong": v("blur-glass-strong") },
      transitionDuration: Object.fromEntries(SRC.motion.tokens.filter((t) => t.name.startsWith("duration")).map((t) => [t.name.replace("duration-", ""), t.value])),
      transitionTimingFunction: Object.fromEntries(SRC.motion.tokens.filter((t) => t.name.startsWith("ease")).map((t) => [t.name.replace("ease-", "axon-"), t.value])),
      zIndex: Object.fromEntries(SRC.zIndex.tokens.map((t) => [t.name.replace("z-", ""), t.value])),
      maxWidth: { container: SRC.layout.tokens.find((t) => t.name === "container-max").value, wide: SRC.layout.tokens.find((t) => t.name === "container-wide").value, prose: SRC.layout.tokens.find((t) => t.name === "container-prose").value },
    },
    screens: Object.fromEntries(SRC.layout.tokens.filter((t) => t.name.startsWith("breakpoint")).map((t) => [t.name.replace("breakpoint-", ""), t.value])),
  },
};
out("tailwind/axoncore-preset.cjs", `${HEADER}/** Tailwind CSS v3 preset. Load dist/css/axoncore.css (or tokens.css + fonts.css) first. */\nmodule.exports = ${JSON.stringify(tw, null, 2)};\n`);

let tw4 = HEADER + "/* Tailwind CSS v4: @import \"tailwindcss\"; @import \"@axoncore/design-system/css/tokens.css\"; @import \"@axoncore/design-system/tailwind/axoncore-theme.css\"; */\n@theme inline {\n";
for (const t of colorTokens) tw4 += `  --color-${t.name}: ${v(t.name)};\n`;
for (const [k] of Object.entries(SRC.type.families)) tw4 += `  --font-${k}: var(--font-${k});\n`;
for (const s of typeStyles) tw4 += `  --text-${s.name.replace("type-", "")}: ${s.fontSize};\n  --text-${s.name.replace("type-", "")}--line-height: ${s.lineHeight};\n`;
for (const t of SRC.radius.tokens) tw4 += `  --${t.name}: ${v(t.name)};\n`;
for (const t of SRC.shadow.tokens) tw4 += `  --${t.name}: ${v(t.name)};\n`;
tw4 += `  --spacing: 4px;\n`;
for (const t of SRC.layout.tokens.filter((t) => t.name.startsWith("breakpoint"))) tw4 += `  --${t.name}: ${t.value};\n`;
tw4 += "}\n";
out("tailwind/axoncore-theme.css", tw4);

/* ── React ──────────────────────────────────────────────────────────── */
const logoData = fs.readFileSync(path.join(ROOT, "src/react/logo-data.json"), "utf8").trim();
const factory = fs.readFileSync(path.join(ROOT, "src/react/factory.js"), "utf8").replace("__LOGO_DATA__", logoData);
const names = ["Logo", "Button", "TextField", "Checkbox", "Switch", "Badge", "Card", "Tabs", "Alert", "Stat", "Table", "SignalLine"];
out("react/index.mjs", `${HEADER}import * as React from "react";\n${factory}\nconst AC = createAxonCore(React);\nexport const { ${names.join(", ")} } = AC;\nexport { createAxonCore };\nexport default AC;\n`);
const umd = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "AxonCore", components: names.map((n) => ({ name: n })) })} */\n(function () {\n${factory}\nwindow.AxonCore = Object.assign(window.AxonCore || {}, createAxonCore(window.React));\n})();\n`;
if (/<\/script|<!--/i.test(umd)) throw new Error("UMD bundle contains a forbidden sequence");
out("react/axoncore.umd.js", umd);
out("react/index.d.ts", fs.readFileSync(path.join(ROOT, "src/react/index.d.ts"), "utf8"));

/* ── Claude Design tokens.json ──────────────────────────────────────── */
const cd = {
  name: SRC.name,
  version: SRC.version,
  meta: SRC.meta,
  color: SRC.color,
  type: { fonts: SRC.type.fonts.concat(licensed), families: SRC.type.families, groups: SRC.type.groups },
  spacing: SRC.spacing,
  radius: SRC.radius,
  shadow: SRC.shadow,
  gradient: SRC.gradient,
  blur: SRC.blur,
  zIndex: SRC.zIndex,
  layout: { tokens: SRC.layout.tokens.map((t) => ({ ...t, value: /^\d+$/.test(t.value) ? t.value : t.value })) },
};
out("claude-design/tokens.json", JSON.stringify(cd, null, 2));
/* ── Skill bundle (kept in sync with docs + dist) ───────────────────── */
const SK = path.join(ROOT, "skill/axoncore-brand");
const refMap = { "01-fundamentos.md": "foundations.md", "02-logo.md": "logo.md", "03-color.md": "color.md", "04-tipografia.md": "typography.md",
  "05-layout-y-superficies.md": "layout.md", "06-componentes.md": "components.md", "07-voz-y-tono.md": "voice.md",
  "08-imagen-y-prompts-ia.md": "imagery-prompts.md", "09-implementacion-y-claude-design.md": "implementation.md", "decisiones.md": "decisions.md" };
fs.rmSync(path.join(SK, "references"), { recursive: true, force: true });
fs.mkdirSync(path.join(SK, "references"), { recursive: true });
for (const [from, to] of Object.entries(refMap)) fs.copyFileSync(path.join(ROOT, "docs", from), path.join(SK, "references", to));
fs.rmSync(path.join(SK, "assets"), { recursive: true, force: true });
fs.mkdirSync(path.join(SK, "assets/logos"), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, "assets/logo/svg"))) fs.copyFileSync(path.join(ROOT, "assets/logo/svg", f), path.join(SK, "assets/logos", f));
fs.copyFileSync(path.join(ROOT, "assets/favicon/favicon.svg"), path.join(SK, "assets/logos/favicon.svg"));
fs.writeFileSync(path.join(SK, "assets/axoncore.css"), HEADER + "/* For artifacts: prepend axoncore-fonts.css (embedded Agrandir + Geist). */\n" +
  tokensCss.replace(HEADER, "") + "\n" + typo.replace(HEADER, "") + "\n" + compCss);
const embed = (f, dir) => `@font-face {\n  font-family: "${f.family}";\n  src: url(data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, dir, path.basename(f.file))).toString("base64")}) format("woff2");\n  font-weight: ${f.weight};\n  font-style: ${f.style || "normal"};\n  font-display: swap;\n}\n`;
fs.writeFileSync(path.join(SK, "assets/axoncore-fonts.css"), "/* AxonCore fonts embedded as WOFF2 data URIs (Agrandir: AxonCore commercial licence; Geist: OFL). Internal use only. */\n" +
  licensed.map((f) => embed(f, "fonts/agrandir")).join("") + SRC.type.fonts.map((f) => embed(f, "fonts/geist")).join(""));
console.log("  ✓ skill/axoncore-brand (references + assets + embedded fonts synced)");
console.log("Done.");
