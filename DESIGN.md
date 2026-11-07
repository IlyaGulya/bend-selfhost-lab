---
name: Bend Compiler Lab
description: A plain engineering report with explicit compiler boundaries and comparable measurements.
colors:
  paper: "#f2f4f3"
  ink: "#1c2826"
  muted: "#53675e"
  line: "#bac5bf"
  yellow: "#d9ef57"
  positive: "#23543c"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.25rem)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 2.8vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  square: "0"
spacing:
  tight: "12px"
  compact: "16px"
  base: "24px"
  loose: "40px"
  chapter: "64px"
components:
  action-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "12px 19px"
  action-primary-hover:
    backgroundColor: "{colors.positive}"
    textColor: "{colors.paper}"
  comparison-summary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    padding: "20px 24px"
  stage:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 15px"
  stage-selected:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
  comparison-value:
    textColor: "{colors.ink}"
    typography: "{typography.data}"
  copy-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: "44px"
---

# Design System: Bend Compiler Lab

## Overview

**Creative North Star: "The Instrument Run Sheet"**

The system is a compact engineering report: cool off-white paper, green-black ink, hairline rules, and one acid-yellow measurement summary. The heading names the subject rather than making a slogan. Content opens directly on the page, without cards, decorative display lines, or an experiment timeline.

Archivo carries prose and interface labels. Fragment Mono is reserved for code, checksums, and numerical table cells. The report distinguishes architecture, measured performance, and historical validation through headings and explicit scope, not colored acceptance badges.

Motion only acknowledges interaction: architecture nodes change fill and border over 180ms. Reduced motion removes transitions and smooth scrolling. Rules and spacing carry hierarchy; there are no shadows.

**Key Characteristics:**
- Literal headings with a 52px desktop title cap and natural wrapping.
- Open ruled sections, square controls, and no decorative containers.
- Archivo for reading; Fragment Mono for code and measured values.
- One visible comparison table with explicit units, sample ranges, and measurement scope.
- Keyboard-visible focus and progressive enhancement of the architecture trace.
- A recomposed mobile reading column, with wide data isolated in a scrollable region.

## Colors

The palette stays neutral except for a measurement summary and the selected architecture node.

### Primary
- **Evidence Acid:** highlights the comparison summary, selected architecture node, text selection, skip link, and copy-button hover. It denotes emphasis or selection, never a favorable performance verdict.

### Secondary
- **Pass Green:** the primary action's hover fill. It is not a performance-status color.

### Neutral
- **Cool Folio Paper:** page field and scrollbar track.
- **Green-Black Ink:** text, primary action, rules requiring emphasis, and keyboard focus.
- **Sage Annotation:** secondary prose, source links, captions, and scrollbar thumb.
- **Hairline Lead:** chapter, table, node, and disclosure borders.

### Named Rules
**The One Signal Rule.** Yellow highlights evidence or selection; it does not mean faster, accepted, or correct. Keep the result and its scope explicit in words.

## Typography

**Display Font:** Archivo (with system-ui, sans-serif)
**Body Font:** Archivo (with system-ui, sans-serif)
**Code/Value Font:** Fragment Mono (with monospace)

**Character:** A restrained reading hierarchy, not a display composition. The title naturally wraps; no forced slogan lines. Both faces are self-hosted under the SIL Open Font License 1.1.

### Hierarchy
- **Display:** the literal report title, capped at 52px on desktop. Mobile uses `clamp(2rem, 6vw, 2.375rem)`, retaining the 1.12 line-height and natural wrapping.
- **Headline:** chapter headings, capped at 36px; mobile uses 28px. They have a 28px bottom margin, reduced to 24px on mobile.
- **Title:** subsection headings. Trace and checksum headings use a local 16px size.
- **Body:** running text at 17px/1.65, capped at 68ch. The introduction's lead uses 21px/1.55, reduced to 19px on mobile.
- **Label:** source links use 13px/1.5 Archivo; captions use 13px and table headings and stage notes use 12px.
- **Data:** numerical table cells use 13px/1.6 Fragment Mono with tabular figures; ranges use 12px. Checksums use 12px and may wrap anywhere. Inline code uses 0.8em in its reading context.

### Named Rules
**The Two-Register Rule.** Archivo carries prose and interface labels. Fragment Mono carries code, identifiers, checksums, and measured table values; do not set prose paragraphs in it.

**The Literal Title Rule.** Name the subject directly. Keep the implemented title scale and natural wrapping; do not reintroduce an oversized slogan or forced display lines.

## Layout

The centered report is `min(calc(100% - 96px), 1184px)` wide. It becomes `calc(100% - 64px)` at 1050px and `calc(100% - 40px)` at 760px. The introduction is one reading block. Architecture and validation use a roughly 1.5/1 split with a 7% gutter; backend notes use two equal columns.

Chapter and introduction padding is 64px vertically. Mobile chapters use 44px; the introduction uses 40px above and 44px below. Subsections begin after a hairline rule with 38px margin and 32px padding, reduced to 32px and 28px on mobile. Reading text caps at 68ch.

- **1050px and below:** hide the brand description, tighten navigation gaps, and narrow the architecture split to 1.4/1 with a 5% gutter.
- **760px and below:** use one reading column. Header navigation moves onto a second row; architecture, validation, and backend notes stack; definition-list labels sit above their values. The trace caps at 440px, while its C/JavaScript fork remains two columns.
- **Wide tables:** use a focusable, labelled horizontal-scrolling region. On mobile the comparison table has a 680px minimum width; the document itself must not overflow.

**The Reading Column Rule.** Recompose content for mobile instead of shrinking the desktop page. Keep prose readable and contain wide data in its own scroll region.

## Elevation & Depth

The system is flat: no shadow, gradient, blur, texture, or hover lift. Hairline rules separate sections and rows; an ink border and yellow fill identify a selected node. Stage fill and border transitions last 180ms; reduced motion disables them and smooth scrolling.

**The Ruled-Not-Lifted Rule.** Separate with a rule, a fill, or spacing. Focus is a 2px ink outline at 5px offset, never a glow.

## Shapes

Controls and data regions are square, with 0 radius and 1px borders. Trace symbols sit in 25px outlined squares, connected by straight rules and a two-target fork. Source disclosures use their native disclosure marker rather than a custom plus.

**The Square-End Rule.** Keep square edges. Do not introduce pills, rounded cards, circular icon buttons, or decorative enclosures.

## Components

### Buttons
- **Primary action:** ink fill and paper text, 15px/600 Archivo at inherited 1.65 line-height, 12px 19px padding, and 44px minimum height. Hover uses Pass Green.
- **Secondary source action:** the same 15px/600 text and 44px minimum height, with an ink bottom rule and no fill.
- **Focus:** the shared 2px ink outline at 5px offset. Arrow icons are 18px with a 1.7 stroke.

### Navigation
A rule-separated header with a 90px minimum height, a 31px/800 wordmark, a 13px brand description, and 14px section links with 24px gaps. The description disappears at 1050px. At 760px navigation occupies its own row and uses 13px text. Navigation and source links have 24px minimum heights; they are not filled actions.

### Architecture Trace
Square nodes have a 52px minimum height, 12px 15px padding, 16px/550 names, and optional 12px notes below the name. The selected node has a yellow fill and ink border. Hover changes the paper and border, but not position. A polite live region updates the description and source link. Without JavaScript the trace remains a labelled diagram and the explanatory report remains readable.

### Comparison Summary
The single yellow prose band uses 20px 24px padding and a 75ch measure; mobile padding is 18px 20px. It states the measured conclusion and its scope, not an acceptance label.

### Measurement Table
The table uses 14px reading text, 12px headers, 13px mono values, and 12px ranges. Cells have 16px vertical padding and hairline bottom rules; header rules use ink. Results are visible together rather than hidden behind runtime tabs or repeated as animated bars. The surrounding region supports keyboard and touch scrolling.

### Copy Control
A square control beside a wrapping checksum: 44px minimum width, 44px height, a hairline border, and yellow hover fill. Its icon has an accessible action name. Feedback reserves a 24px line below the checksum; failure leaves the source text available for manual copying.

### Source Disclosure
Native `<details>` with a top rule and a 15px/600 summary padded 20px vertically, with a 44px minimum height. Hover underlines the summary; keyboard focus uses the shared outline. Exact hashes and provenance are secondary to the report's plain labels.

### Containers and Fields
Sections, two-column notes, and definition lists open on the page rather than in cards. Definition-list rows have hairline separators and a 210px label track on desktop, stacking at 760px. No forms, text-entry fields, status chips, segmented controls, or duration bars ship.

## Do's and Don'ts

### Do:
- **Do** use literal headings and preserve the modest title scale and natural wrapping.
- **Do** distinguish architecture, comparable measurements, and historical validation with explicit scope.
- **Do** keep running prose at 17px/1.65 and a 68ch measure.
- **Do** keep measured values aligned in a table, with units and observed ranges.
- **Do** use yellow only for evidence, selection, and interaction emphasis—not as a favorable verdict.
- **Do** retain visible keyboard focus and progressive enhancement.
- **Do** contain wide tables in labelled, focusable scroll regions.

### Don't:
- **Don't** introduce slogans, forced display lines, or a giant promotional hero.
- **Don't** require internal experiment or generation names to understand the report.
- **Don't** add cards, shadows, gradients, blur, texture, or rounding.
- **Don't** treat lower memory or successful validation as evidence of faster compilation.
- **Don't** bring back runtime tabs, animated comparison bars, or status badges that no longer exist.
- **Don't** set prose paragraphs in Fragment Mono or hide the primary results behind JavaScript.

