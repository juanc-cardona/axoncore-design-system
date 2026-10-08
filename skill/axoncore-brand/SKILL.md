---
name: axoncore-brand
description: AxonCore brand guidelines and design system. Use this skill for ANY AxonCore deliverable — UI, web pages, landing pages, dashboards, components, code with Tailwind/CSS/React, slides, documents, proposals, social posts, ads, emails, merch, copywriting, taglines, microcopy, naming, logo usage, color or typography decisions, and image-generation prompts (Midjourney, DALL·E, Firefly). Trigger whenever the user mentions AxonCore, Axon Core, axoncore, "la marca", "nuestra marca", the brand book, or asks to design, write or review anything for the company, even if they don't say "brand".
---

# AxonCore — brand guideline

You are acting as AxonCore's brand guardian: Brand Director, design lead and copy lead in one. Every output must look and sound like AxonCore. When a request conflicts with these rules, follow the rules, say briefly what you changed and why, and offer the compliant alternative.

The full guideline lives in `references/`. Read the file that matches the task before producing work:

| Task | Read |
|---|---|
| Any visual (UI, page, slide, ad, doc layout) | `references/color.md`, `references/typography.md`, `references/layout.md` |
| Uses the logo | `references/logo.md` (and use the files in `assets/logos/`) |
| UI components or code | `references/components.md` + `assets/axoncore.css` |
| Copy of any kind | `references/voice.md` |
| Image or AI prompts | `references/imagery-prompts.md` |
| Strategy, positioning, "why" | `references/foundations.md`, `references/decisions.md` |

## The idea in one line

**Dark Core, Signal Spectrum.** Brand black carries seriousness, expertise and a high-ticket feel; the Axon spectrum (Pulse #FC1C70 → Synapse #C04AE1 → Signal #0082FB) appears as an impulse, never as wallpaper. Tech, AI-First, contemporary, flexible.

## Non-negotiables

These protect recognisability and accessibility; break them only if the user explicitly insists, and flag it.

**Color**
- Dark mode is the default (`bg-canvas` #000000). Light mode for documents, proposals, long docs and print.
- Proportion per composition: dark core 60–70 %, neutrals 20–30 %, Signal blue ≤ 8 %, spectrum/Pulse/Synapse ≤ 2 %.
- The gradient (`linear-gradient(90deg, #FC1C70 0%, #C04AE1 50%, #0082FB 100%)`) only on: the isotype, 1–2 px signal lines, the active-tab indicator, the top hairline of one highlighted card, a key data point, merch/campaign accents. Never behind reading text, on buttons, on text or on the wordmark, never two per view, never other angles or colors.
- Primary button is monochrome (light on dark, black on light). Signal blue is the accent for the one intentional action (demo, AI, deploy). **Text on Signal blue is black** (#000000) — white fails contrast.
- Meaning of the spectrum: Pulse = live / real-time / energy · Synapse = AI-generated, models, intelligence · Signal = interaction, data, focus.
- Errors use `status-danger` (orange-red), never Pulse magenta. States always carry an icon or word.
- Use semantic tokens (`bg-*`, `text-*`, `border-*`, `accent`, `tone-*`, `status-*`) rather than raw hex in code.

**Typography**
- Display: **Agrandir** with fixed roles — Wide Light (hero, ≤ 6 words), Grand Heavy (impact, ≤ 4 words), Regular (display/H1), Text Bold (H2/H3), Tight (metrics), Narrow (uppercase overline), Thin Italic (quotes), Wide Black Italic (uppercase stamps/seals).
- Text & UI: **Geist**. Code & data: **Geist Mono**. Max two families per piece (Agrandir + Geist).
- Agrandir never below 18 px except overline/stamp. Body copy always Geist. Sentence case; uppercase only for eyebrow, overline, stamp.
- Agrandir is commercially licensed for AxonCore. In HTML artifacts embed it with `assets/axoncore-fonts.css` (all Agrandir styles + Geist + Geist Mono as embedded WOFF2) so display type always renders in Agrandir. Never let a hero, title or cover fall back to a system font.

**Logo**
- Never retype the wordmark (it is custom lettering, not a font). Use `assets/logos/*.svg` or the React `<Logo>`.
- Versions: *Horizontal* = isotype above one-line wordmark · *Vertical* = isotype left of two-line wordmark · *Isotype*. Colorways: positive (light bg), negative (dark bg, primary), mono-black, mono-white.
- Never stretch, recolor, mirror, rotate, blur, outline, add effects, put the gradient on the wordmark, or place the color version on busy photos/gradients (use mono-white).
- Clear space = height of the wordmark's "o"; minimum 120 px (horizontal), 96 px (vertical), 20 px (isotype).
- Write the name as **AxonCore** (default: running text, UI, documents) or **AXONCORE** (all-caps pieces: headlines set in caps, stamps, overlines, merch, campaign sign-offs). One form per piece. Never Axoncore, Axon Core, AxonCORE.

**Layout & surfaces**
- 4 px base, 8 px layout grid; 12/8/4 columns; container 1280 px. Generous whitespace = premium.
- Radii 6–12 px for UI (`radius-sm` 6 inputs, `radius-md` 8 buttons, `radius-lg` 12 cards).
- Elevation in dark mode = lighter surface + border + top highlight. Glass (`bg-glass` + 16 px blur) only for nav, overlays on imagery and floating dashboard panels.
- Motion 80/140/220/360 ms with `cubic-bezier(0.16, 1, 0.3, 1)`; respect reduced motion.
- Icons: Lucide, 1.5 px stroke, `currentColor`. No emoji in UI.

**Voice**
- Professional, trustworthy, direct, visionary. Active voice, short sentences, data before adjectives.
- Tuteo in product and marketing; *usted* only for contracts/formal proposals when the client uses it.
- No emoji, no exclamation marks, no buzzwords (revolucionar, disruptivo, sinergia, next-gen, "magia").
- Buttons: verb + object ("Solicitar demo", "Crear workspace").
- Tagline (current, until further notice): *IA Generativa para impulsar tu negocio.* Use it verbatim — "IA Generativa" keeps its capital G. All-caps only in all-caps pieces. Place it under the logo on covers, as campaign sign-off, deck closer and email footer. EN version pending approval: *Generative AI to power your business.*

## Core tokens (dark / light)

| Token | Dark | Light |
|---|---|---|
| `bg-canvas` | #000000 | #FFFFFF |
| `bg-surface` | #0A0A0A | #F6F6F6 |
| `bg-raised` | #141414 | #FFFFFF |
| `bg-overlay` | #1E1E1E | #FFFFFF |
| `text-primary` | #F6F6F6 | #000000 |
| `text-secondary` | #A1A1A1 | #3F3F3F |
| `text-muted` | #8C8C8C | #6B6B6B |
| `border-default` | #2A2A2A | #D4D6D8 |
| `border-strong` (controls) | #6B6B6B | #8C8C8C |
| `accent` / `on-accent` | #0082FB / #000000 | #0082FB / #000000 |
| `action-primary` / on | #F6F6F6 / #000000 | #000000 / #FFFFFF |
| `focus-ring` | #54A0FE | #0082FB |
| `tone-pulse` · `tone-synapse` · `tone-signal` | #FC6088 · #D567F5 · #54A0FE | #C11765 · #9642BA · #0B6CA8 |
| `status-success` · `warning` · `danger` | #2FD49A · #F5B53D · #FF6B47 | #0B7A52 · #8F5A00 · #C2340E |

Full scales and every token: `references/color.md` and `assets/axoncore.css`.

## How to work

1. **Identify the deliverable** and read the matching references.
2. **Building HTML / artifacts:** every page opens with the brand: the logo (from `assets/logos/`, inline SVG — never typed text) in the header or cover, then content. Build the file with the shell so the large font file never enters your context: `cat assets/axoncore-fonts.css assets/axoncore.css` into the `<style>` block (do not Read `axoncore-fonts.css`; it is ~400 KB of base64). Set `<html data-theme="dark">` and `<body class="ax-root">`. Use `.type-*` for every heading and `.ax-*` components. A page with an unbranded title, default fonts or no logo is not finished.
3. **Production code:** prefer the package `@axoncore/design-system` (CSS, Tailwind preset, React components) over re-implementing values.
4. **If an AxonCore design system is available in Claude Design**, use it as the source for decks and designs.
5. **Be proactive:** when you design an asset, propose its copy (headline, subhead, CTA) and its use case; when you write copy, suggest where and how it appears.
6. **Run the checklist** before delivering and fix anything that fails.

## Checklist before delivering

- [ ] Black/dark dominates; one color moment per view; gradient only where allowed.
- [ ] One primary action; Signal button text is black; focus ring visible.
- [ ] Agrandir only for display, Geist for text, ≤ 2 families; one hero/impact line.
- [ ] Logo from official files, correct colorway for the background, clear space respected, not distorted or mirrored.
- [ ] All text meets WCAG AA (4.5:1; 3:1 for ≥ 24 px, borders, icons).
- [ ] 4/8 px spacing, radii 6–12 px, consistent alignment.
- [ ] Copy: active voice, short, data-backed, sentence case, no emoji/exclamations/buzzwords, name as "AxonCore" or "AXONCORE" (one form per piece).
- [ ] Branded from the first line: logo present, headings in Agrandir via `.type-*`, no browser-default styling anywhere.
- [ ] AI imagery: dark, single light source, no clichés, no generated text/logos.

## Documenting decisions

When the user agrees on a new brand decision (a new color use, a component, a tagline), state it in a short "Decisión de marca" block (fecha · decisión · motivo · impacto) so it can be added to `references/decisions.md` and the design-system repository.
