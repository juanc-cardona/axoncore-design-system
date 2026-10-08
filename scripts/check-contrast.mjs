#!/usr/bin/env node
/** WCAG 2.x contrast audit for every semantic pairing the system promises, in every theme. Exit 1 on failure. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { themes } = JSON.parse(fs.readFileSync(path.join(ROOT, "dist/tokens/tokens.resolved.json"), "utf8"));

const hex = (h) => {
  h = h.replace("#", "");
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(a);
};
const over = (fg, bg) => { const [r, g, b, a] = hex(fg), [R, G, B] = hex(bg); return [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)]; };
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const SURFACES = ["bg-canvas", "bg-surface", "bg-raised", "bg-overlay"];
const checks = [];
const add = (fg, bgs, min, note, tint) => checks.push({ fg, bgs, min, note, tint });
for (const t of ["text-primary", "text-secondary", "text-muted", "text-link", "tone-pulse", "tone-synapse", "tone-signal", "status-success", "status-warning", "status-danger", "status-info"]) add(t, SURFACES, 4.5, "text");
add("text-muted", ["bg-sunken"], 4.5, "placeholder in inputs");
add("text-primary", ["bg-sunken"], 4.5, "input value");
add("text-inverse", ["bg-inverse"], 4.5, "inverse text");
add("on-accent", ["accent", "accent-hover", "accent-pressed"], 4.5, "accent button label");
add("on-action-primary", ["action-primary", "action-primary-hover", "action-primary-pressed"], 4.5, "primary button label");
add("border-strong", [...SURFACES, "bg-sunken"], 3, "control border");
add("focus-ring", [...SURFACES, "bg-sunken"], 3, "focus ring");
add("accent", [...SURFACES], 3, "selected control fill vs surface");
for (const [fg, tint] of [["tone-pulse", "tone-pulse-subtle"], ["tone-synapse", "tone-synapse-subtle"], ["tone-signal", "tone-signal-subtle"], ["status-success", "status-success-subtle"], ["status-warning", "status-warning-subtle"], ["status-danger", "status-danger-subtle"]])
  add(fg, ["bg-canvas", "bg-raised"], 4.5, "badge/callout text on tint", tint);
add("text-secondary", ["bg-canvas", "bg-raised"], 4.5, "callout body on tint", "tone-synapse-subtle");

let fails = 0, total = 0;
for (const [theme, c] of Object.entries(themes)) {
  console.log(`\n${theme.toUpperCase()}`);
  for (const ch of checks)
    for (const bg of ch.bgs) {
      total++;
      const ground = ch.tint ? over(c[ch.tint], c[bg]) : over(c[bg], "#000000");
      const fgc = over(c[ch.fg], "#" + ground.map((x) => Math.round(x).toString(16).padStart(2, "0")).join(""));
      const r = ratio(fgc, ground);
      const ok = r >= ch.min;
      if (!ok) fails++;
      if (!ok || process.argv.includes("--all"))
        console.log(`  ${ok ? "✓" : "✗"} ${ch.fg} on ${ch.tint ? ch.tint + "/" : ""}${bg}: ${r.toFixed(2)}:1 (min ${ch.min}, ${ch.note})`);
    }
}
console.log(`\n${total - fails}/${total} pairs pass.`);
process.exit(fails ? 1 : 0);
