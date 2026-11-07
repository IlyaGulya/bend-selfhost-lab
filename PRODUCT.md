# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static semantic HTML, CSS and small vanilla JavaScript enhancements. Netlify publishes `public/`; no runtime framework, dependency installation or build step is required. Core report content and measurement tables are authored in HTML, not fetched at runtime. Structured evidence is downloadable at `public/data/evidence.json`.

## Users

Engineers reading in English who may know nothing about the compiler experiments. They need to understand what the compiler does, how its architecture differs from the official TypeScript implementation, and the exact scope of the measured comparison.

## Product Purpose

Publish a plain, factual engineering report titled **Self-hosted Bend compiler**. Explain self-hosting, the checked front-end program, one shared lowering into structured backend IR, target-specific work and concrete storage ownership. Quantify the observed checking-time difference using a fresh matched official/native comparison, with absolute values and limitations visible together.

The user explicitly rejected the slogan-led presentation and oversized forced-line title. This is a full editorial revision, not a hero restyle. Historical experiment identifiers, acceptance timelines and rejected optimization stories are not the primary reading path.

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
- Design contract: `DESIGN.md`, `.impeccable/design.json`, `.impeccable/surfaces/public-index-html.md`.

Publish only `public/`, not development notes or private timing outputs. Keep compiler source changes and website publication separate.

## Capabilities and Constraints

1. Explain source → checked program → one lowering → executable program → C or JavaScript. Define IR, affine use, erasure, captures and continuations where introduced.
2. Preserve keyboard-operable stage inspection, checksum copying and evidence downloads. All essential claims and numbers remain readable without JavaScript.
3. Compare the same retained 52-file closure: 17 Bend modules and 35 foreign JavaScript files. Headline timing combines source-processing phases and excludes startup, emission and external C compilation. Do not divide unrelated historical receipts.
4. Show both implementations in a static table: median, three-sample range, ratio to the official median and sampled peak RSS. Describe host, runtime, guards and guardian process-tree scope.
5. Distinguish current source architecture from the digest-bound historical native executable. Its current-source authentication mismatch is disclosed, not patched away or treated as a newly qualified build.
6. Historical self-compilation validation is separate: two successive JavaScript images were byte-identical; 95 distinct fixtures across three images means 285 executions, not 285 tests.
7. Do not claim universal corpus representativeness, a semantic-preservation proof, all-flat/zero-allocation storage, measured GC causality, pure-C self-hosting or complete target parity.
8. No private absolute paths, usernames, machine hostnames, credentials, raw logs, telemetry or contact forms in the public site.

## Brand Commitments

Preserve the quiet Instrument run sheet palette, self-hosted Archivo and Fragment Mono, open ruled sections and square controls. Use a natural-wrapping title capped near 52px on desktop and 32–38px on mobile. No marketing slogan, forced display lines, experiment-status banner or backend comparison toggle.

## Product Principles

- Explain the mechanism before asking readers to interpret evidence.
- Put a result’s operation, denominator and limitations beside its numbers.
- Keep current-source analysis, fresh artifact-bound measurements and historical validation distinct.
- Link primary source adjacent to factual claims.
- Prefer a durable static reading experience over decorative interaction.

## Accessibility & Inclusion

Target WCAG 2.2 AA: semantic headings and tables, visible keyboard focus, reduced motion, readable mobile typography and keyboard-accessible horizontal table scrolling. Stage and action controls have at least 44px targets; source links have at least 24px height. Color never carries a result by itself.
