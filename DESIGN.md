---
name: Bend Compiler Lab
description: A compact visual engineering guide to compiler architecture and scoped measurements.
colors:
  paper: "#f2f4f3"
  ink: "#1c2826"
  muted: "#53675e"
  line: "#bac5bf"
  surface: "#e2e8e3"
  yellow: "#d9ef57"
  positive: "#23543c"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.1vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  code:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  square: "0"
spacing:
  tight: "8px"
  compact: "12px"
  diagram: "20px"
  base: "24px"
  chapter: "30px"
---

# Design System: Bend Compiler Lab

## Visual authority

Preserve the **Instrument Run Sheet**: cool paper, green-black ink, sage annotations, hairline rules, square controls, self-hosted Archivo and Fragment Mono. This is a density and information-architecture refinement of that world, not a new brand.

Mode: **Read**. The visitor may never have encountered Bend, self-hosting or an intermediate representation. The page must explain a real program and the compiler through labelled geometry before asking the visitor to read detailed contracts.

The title names the subject: **Self-hosted Bend compiler**. No slogan, decorative eyebrow, giant hero number, experiment timeline, shadow, gradient, rounding or decorative illustration. Borders identify actual code, compiler stages, storage and data—not arbitrary prose cards.

## Reading path

1. One sentence defines Bend, compiler outputs and self-hosting.
2. Actual Bend source sits beside a capture/addition diagram and a genuine precompiled-JavaScript run action. The diagram labels its result **expected**; only execution creates an observed result in the status region.
3. A single source-to-target graph exposes checked meaning, shared lowering, executable operations and the C/JavaScript fork. Clicking a stage adds a short explanation and a pinned source link.
4. Two concrete storage diagrams explain numeric indexing, start/count slices and declaration-local scratch rewind. Indices and cells are symbolic, not allocation measurements.
5. A semantic comparison table incorporates static proportional bars inside its time/memory cells. There is no duplicate standalone comparison chart. A separate phase ribbon decomposes one native run.
6. A self-compilation chain connects the native seed and successive JavaScript images. The byte-equality bracket is separate from the valid/error case split and case-count equation.
7. Native disclosures retain emitted code, architecture contracts, official comparison, measurement limitations, checksums and protocol. Evidence downloads and source remain ordinary links.

Internal FIR/BIR names, generation identifiers and experiment histories do not drive the default reading path. Do not hide the operation boundary, historical-artifact qualification or measurement units with the expert detail.

## Palette and typography

Paper `#f2f4f3`, ink `#1c2826`, muted `#53675e`, line `#bac5bf`, neutral cell surface `#e2e8e3`, evidence yellow `#d9ef57`, runtime-success green `#23543c`.

Yellow means selection or emphasis, not faster or correct. The slower compiler's time ratio is highlighted yellow; its bars use ink. Official bars use sage. Memory and time use separate scales. Native phase segments use sage, line and ink, with text labels; color never carries the category alone.

Archivo carries prose and control labels. Fragment Mono is reserved for source, operations, hashes and measured values. Body is 16px/24px with a 70ch measure. The lead may reach 86ch as a compact definition. Main headings cap at 40px; chapter headings cap at 28px; mobile uses 30px and 24px respectively. Subheadings use 17px, diagram node names 14–15px, notes 13px. Source, ranges and stage samples stay at least 12px. Measured table values are 22px desktop and 18px mobile.

SVG labels use 16px coordinates, 17px on mobile where necessary to preserve readable rendered sizes. Diagrams adapt to the available width; they do not introduce page overflow. All fonts are local, unmodified licensed assets.

## Layout and density

The report is `min(calc(100% - 64px), 1280px)` wide; at 760px and below it uses `calc(100% - 32px)`. The header is 64px high before mobile recomposition. The introduction has 28px vertical padding and chapters 30px; mobile uses 22px and 24px. This replaces the former 56–64px section padding rather than making text tiny.

The title and short definition span the top. Below, source and its capture/execution figure share a 0.9/1.1 desktop row with a 28px gutter and one separating rule. Architecture is a horizontal graph, followed by two open storage figures. Comparison and phase cost share a 1.3/0.9 row. Historical compilation and case coverage share a 1.4/1 row. Typical figure gutters are 24–40px, not percentage-based empty columns.

At 1050px, node gutters tighten and tall labels can wrap. At 760px, explanatory rows stack, the stage graph turns downward, and C/JavaScript remain a two-column fork. Mobile stage labels and operation samples form two tracks inside each node. Navigation occupies a second row.

The comparison remains a native three-column table with fixed 26/38/36 percent tracks. Units live in the headers, ranges below values. Even narrow phones can compare both metrics without a forced 680px table. Its labelled focusable wrapper remains an overflow safety boundary. Source wraps instead of shrinking.

## Components and interaction

- **Primary run action:** ink/paper, square, 44px minimum height; pass-green hover. Loading disables it and exposes `aria-busy`. Actual loading, success and failure are described by a polite live region. Keyboard completion restores lost focus, not a different focused control.
- **Stage graph:** square bordered nodes, at least 44px targets, with yellow/ink selection. Only one `aria-pressed` stage at a time. Straight authored SVG arrows carry flow; snippets are explicitly conceptual rather than an IR dump. Source and checker are not passed into the target backend.
- **Capture diagram:** the remembered value joins the later argument at the addition operation. Box text has real inset, not a label touching its outline. The real source and generated module are not modified to match the illustration.
- **Storage figures:** array slots and highlighted indices/slices, followed by work/rewind views of identical capacity. No byte sizes, zero-allocation promise, GC causality or claim that RSS falls after rewind.
- **Measurements:** HTML supplies values and widths; JavaScript does not fetch primary facts or animate them. Absolute medians, observed ranges, relative time and sampled-memory units stay together. The native sample-3 split is not an official/native phase comparison.
- **Self-compilation:** each arrow compiles the same compiler source. The two output images have the same full byte count/hash. The 95-case by 3-image equation denotes 285 executions, not distinct tests.
- **Disclosures:** native `details` and a 44px summary with 12px vertical padding. Source links, full hashes and qualifications remain available without JavaScript. Closed expert detail is the main way prose is reduced.
- **Copy:** square 44px button; yellow hover; text feedback and selectable hash remain available if clipboard access fails.

## Accessibility and browser surfaces

Semantic headings, figure descriptions, table headers and native disclosures. Body contrast at least 4.5:1. Actions and stage controls at least 44px high; ordinary source links at least 24px. Focus is an ink 2px outline at 4px offset. Selection, caret, scrollbars, underlines and tabular numerals use the same palette.

Only stage selection has a short 180ms acknowledgement; no perpetual motion, load-hidden sections or reveal animations. Reduced motion disables smooth scrolling and transitions. Forced-colors mode preserves control and bar boundaries. Initial HTML never claims the demo has run.

## Evidence boundaries

Keep three scopes distinct: current linked source architecture, the matched check-only measurements of a historical diagnostic native artifact, and historical self-compilation validation. The static page and public JSON must agree. Never replace unchanged generated output with a handwritten adapter, relax the CSP, add telemetry, or publish private paths/logs.

All full measurement metadata and source links survive progressive disclosure. A shorter page does not justify removing limits on what a measurement or fixed point establishes.
