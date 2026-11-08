# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static semantic HTML, CSS and small vanilla JavaScript enhancements. Netlify publishes `public/`; no runtime framework, dependency installation or build step is required. Core report content and measurement tables are authored in HTML, not fetched at runtime. Structured evidence is downloadable at `public/data/evidence.json`.

## Users

Engineers reading in English who may know nothing about the compiler experiments. They need to understand what the compiler does, how its architecture differs from the official TypeScript implementation, and the exact scope of the measured comparison.

## Product Purpose

Publish a compact visual guide titled **Self-hosted Bend compiler**. Start with a real program and its captured-value diagram, then explain the compiler pipeline, indexed storage, measured time/memory and historical self-compilation. Detailed contracts and protocol remain available through native disclosures.

The user explicitly rejected slogans and an oversized forced-line title, and requests substantially less empty space and default prose, with more infographics for people new to the project. Historical experiment identifiers, acceptance timelines and rejected optimization stories are not the primary reading path.

## Positioning

Independent compiler engineering report, not an official Bend release announcement or a promise of speed. Self-hosting means compiling the compiler’s own source. The official compiler already has checked terms and intermediate representations; the architectural distinction is the explicit owned checked-program boundary and shared lowering, not “IR versus no IR.” Both target backends still perform analysis and representation work.

## Operating Context

- Website source: `https://github.com/IlyaGulya/bend-selfhost-lab`.
- Live report: `https://bend-selfhost-lab.netlify.app`.
- Compiler source: `https://github.com/IlyaGulya/bend`, integration branch `selfhost/integration`.
- Architecture permalink snapshot: `f63679c31e3219b9fbd119625d35ec03cb2ad224`.
- Report files: `public/index.html`, `public/styles.css`, `public/app.js`.
- Public evidence: `public/data/evidence.json`, schema version 2.
- Retained measurement adapters/protocol: `measurement/`.
- Source research: `.impeccable/review/engineering-architecture-research.md` and `.impeccable/review/official-comparison-research.md`.
- Design contract: `DESIGN.md`, `.impeccable/surfaces/public-index-html.md`.

Publish only `public/`, not development notes or private timing outputs. Keep compiler source changes and website publication separate.

## Capabilities and Constraints

1. Lead with real closure source and a capture/addition diagram beside an optional “Run emitted JavaScript” action. It executes a local precompiled module, not a browser compiler; the initial state must say it has not run. Do not replace emitted arithmetic with a handwritten implementation.
2. Explain source → checked program → one lowering → executable operations → C or JavaScript with a single interactive graph. Preserve stage inspection, checksum copying and downloads. All primary results and explanations are authored in HTML and remain available without JavaScript.
3. Compare the same retained 52-file closure: 17 Bend modules and 35 foreign JavaScript files. Headline timing combines source-processing phases and excludes startup, emission and external C compilation. Do not divide unrelated historical receipts.
4. Show both implementations in one static semantic table with proportional bars inside its cells: median, three-sample range, ratio to the official median and sampled peak RSS. Do not repeat it as a second chart. Retain host, runtime, guards and guardian process-tree scope in disclosures.
5. Distinguish current source architecture from the digest-bound historical native executable. Its current-source authentication mismatch is disclosed, not patched away or treated as a newly qualified build.
6. Historical self-compilation validation is separate: two successive JavaScript images were byte-identical; 95 distinct fixtures across three images means 285 executions, not 285 tests.
7. Do not claim universal corpus representativeness, a semantic-preservation proof, all-flat/zero-allocation storage, measured GC causality, pure-C self-hosting or complete target parity.
8. No private absolute paths, usernames, machine hostnames, credentials, raw logs, telemetry or contact forms in the public site.
9. Explain source pools, numeric handles, start/count slices and scratch reuse with labelled conceptual geometry—not compiler dumps or heap profiles. Keep the official/selfhost responsibility comparison and ownership qualifications in architecture details.
10. Plot native sample 3 only: parse 6.198936 s, expand 1.834936 s, check 19.672753 s; total 27.706625 s. The 71.00% check share identifies recorded cost, not causality. Parser-fuel setup is 1.318933 s inside parse, not another phase. No isolated official/native phase comparisons.
11. Use native disclosures for detailed contracts, protocol and provenance. Loading, actual runtime success and failure are distinct demo states; source and module downloads remain available without running anything. No eval, dynamic Function construction or weakened CSP.

## Brand Commitments

Preserve the quiet Instrument Run Sheet palette, self-hosted Archivo and Fragment Mono, open ruled sections and square controls. Use a natural-wrapping title capped at 40px desktop and 30px mobile, 16px/24px body text, 30px desktop chapter padding, compact visual rows and native disclosure for expert prose. No marketing slogan, forced display lines, experiment-status banner or backend comparison toggle.

## Product Principles

- Let a small real program teach the mechanism before asking readers to interpret evidence.
- Put a result’s operation, denominator and limitations beside its numbers.
- Keep current-source analysis, fresh artifact-bound measurements and historical validation distinct.
- Link primary source adjacent to factual claims.
- Prefer a durable static reading experience over decorative interaction.

## Accessibility & Inclusion

Target WCAG 2.2 AA: semantic headings and tables, visible keyboard focus, reduced motion, readable mobile typography and keyboard-accessible horizontal table scrolling. Stage and action controls have at least 44px targets; source links have at least 24px height. Color never carries a result by itself.
