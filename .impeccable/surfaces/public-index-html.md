---
version: 1
slug: "public-index-html"
primary_target: "public/index.html"
related_targets: ["public/styles.css","public/app.js"]
---

# Engineering report surface brief

Mode: Read. Audience: engineers reading English, without prior knowledge of the experiment history. Job: understand the self-hosted compiler’s architecture, compare a correctly scoped fresh measurement with the official implementation, and inspect primary evidence. Primary action: read the comparison; secondary action: inspect compiler source.

## User intent

Title and h1: **Self-hosted Bend compiler**. The user rejected slogan-led copy, a forced huge heading, generation-led history and unrelated historical numbers used as an official slowdown denominator. Replace the entire reading path, not just the opening. Preserve the existing quiet visual identity, useful pipeline interaction and evidence access.

## Direction contract

**World:** Instrument run sheet. Cool off-white paper, green-black ink, restrained sage annotations, hairline rules and square controls. Self-hosted Archivo carries prose; Fragment Mono carries recorded numeric values, hashes and code. No images, decorative illustrations, shadows, gradients, cards or new dependencies.

**Typography:** Natural-wrapping h1, no forced spans or line breaks, maximum 52px desktop and 32–38px mobile. Body remains 17px/1.65 with a 68-character reading measure; headings are modest chapter labels rather than slogans. No eyebrow labels or numbered decorative sections.

**Reading order:**

1. Explain that the compiler is written in Bend, emits C/JavaScript, and can compile its own source. Self-hosting is not a speed claim.
2. Explain the checked front-end boundary, one lowering, structured backend IR, official implementation’s existing checked terms/IR, target-specific work and storage ownership.
3. Present the fresh matched official/native check-only comparison, absolute medians, sample ranges, ratio of medians and sampled peak memory. Scope and caveats remain adjacent.
4. Explain historical self-compilation validation: byte-identical successive JavaScript images and 95 fixtures across three compiler images, not 285 distinct tests.
5. Give measurement method, provenance, source revision and downloadable evidence. Disclose that the native executable is a previously validated historical artifact, not a fresh build of the described current source.

**First viewport:** Compact report navigation, plain title, concise purpose and source/comparison actions. No forced display thesis, historical acceptance banner or prominent unexplained experiment identifiers.

**Architecture:** The desktop reading column sits beside an authored source-to-two-target pipeline. Each square stage button updates a plain explanation and immutable source link. The six selectable stages are source, checked program, shared lowering, executable program, C and JavaScript. The article supplies all of those explanations without JavaScript. On mobile, the diagram follows the main pipeline explanation at a readable width; controls never shrink into a miniature desktop composition.

**Measurement:** A static semantic table shows both roles at once. No backend toggle, duration animation or old baseline/candidate data. Yellow is limited to the selected pipeline stage, compact measured-result summary and control states. The headline is source-processing wall time, not whole-command duration or compiler construction. Full-command timing and process-tree RSS scope are explicitly distinguished in the method.

**Supporting detail:** Open ruled subsections explain storage mechanisms and target work. A native disclosure retains hashes and historical receipt provenance without turning experiment names into primary navigation, headings, captions or ARIA labels. The copy control has an accessible name and polite feedback; it is hidden until JavaScript enables it.

## Accessibility and runtime constraints

- Static content remains readable without JavaScript; no render-blocking fetch or client-side table population.
- Semantic headings, row/column headers, table captions and named keyboard-focusable scrolling regions.
- 44px minimum action, copy and stage controls; 24px source links; 2px visible focus outline.
- Reduced-motion support, no load-hidden content and no perpetual animation.
- No color-only meaning; a ratio and scope must be understandable in plain text.
- Local licensed fonts only. No analytics, remote runtime dependencies or private machine paths.

## Source and maintenance

- Content: `public/index.html`; style: `public/styles.css`; enhancements: `public/app.js`.
- Data download: `public/data/evidence.json` (schema version 2).
- Measurement sources: `measurement/` in the website repository.
- Architecture research: `.impeccable/review/engineering-architecture-research.md`.
- Comparison protocol research: `.impeccable/review/official-comparison-research.md`.
- Primary compiler links use snapshot `f63679c31e3219b9fbd119625d35ec03cb2ad224`.

Keep HTML and JSON values synchronized from the same admitted fresh result. Do not substitute archived throughput for the official denominator. Current-source architecture, measured artifact identity and historical validation remain visibly separate. Parent integration owns final browser/accessibility checks, design-document synchronization and publication; no checks or deployment run during the serial timing cohort.
