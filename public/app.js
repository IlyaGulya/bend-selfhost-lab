const stages = {
  source: {
    title: "Source, not a host-side replay",
    description:
      "The self-hosted compiler owns parsing, checking, lowering, and emission. Host drivers advance opaque native-owned Run values; they do not replace the language algorithm.",
    file: "checkpoints/SELFHOST_IR_ARCHITECTURE.md",
    label: "Read the architecture",
  },
  fir: {
    title: "A checked semantic boundary",
    description:
      "Checked FIR preserves the front end’s meaning and ownership obligations. Compact handles and declaration-scoped storage keep representation choices separate from those obligations.",
    file: "bend2/selfhost/FIR_LAWS.md",
    label: "Read the FIR contract",
  },
  bir: {
    title: "One shared lowering",
    description:
      "Backend IR makes calls, captures, control flow, and representation choices explicit. C and JavaScript consume this common lowered structure rather than inventing separate semantics.",
    file: "bend2/selfhost/BIR_LAWS.md",
    label: "Read the BIR contract",
  },
  c: {
    title: "C, from the shared program",
    description:
      "The C backend renders the common backend IR into native code. A historical accepted baseline completed the full frozen compiler root under the original resource guards.",
    file: "bend2/selfhost/c_backend.bend",
    label: "Inspect the C backend",
  },
  js: {
    title: "JavaScript that compiles itself",
    description:
      "The JavaScript backend retains a public boxed ABI and a bounded private scheduler. Self-emission is checked with actual stage images, byte identity, and consumer behavior.",
    file: "bend2/selfhost/js_backend.bend",
    label: "Inspect the JS backend",
  },
};
const sourceBase = "https://github.com/IlyaGulya/bend/blob/f63679c3/";
const stageButtons = [...document.querySelectorAll("[data-stage]")];
for (const button of stageButtons)
  button.addEventListener("click", () => {
    const stage = stages[button.dataset.stage];
    if (!stage) return;
    for (const other of stageButtons)
      other.setAttribute("aria-pressed", String(other === button));
    document.querySelector("#trace-title").textContent = stage.title;
    document.querySelector("#trace-description").textContent =
      stage.description;
    const source = document.querySelector("#trace-source");
    source.href = sourceBase + stage.file;
    source.querySelector("span").textContent = stage.label;
  });
const comparisons = {
  native: {
    label: "Native compiler root",
    baseline: 94.619261667,
    candidate: 81.992515625,
    memory:
      "Native median RSS: +2.99%. This historical checkpoint passed its recorded gates; the later diagnostics use a separate physical-footprint gate.",
  },
  js: {
    label: "JavaScript compiler root",
    baseline: 305.989907584,
    candidate: 266.464503208,
    memory:
      "JavaScript median RSS: −14.70%. This historical checkpoint passed its recorded gates; the later diagnostics use a separate physical-footprint gate.",
  },
};
const backendButtons = [...document.querySelectorAll("[data-backend]")];
for (const button of backendButtons)
  button.addEventListener("click", () => {
    const d = comparisons[button.dataset.backend];
    if (!d) return;
    for (const other of backendButtons)
      other.setAttribute("aria-pressed", String(other === button));
    document.querySelector("#comparison-title").textContent = d.label;
    document.querySelector("#baseline-duration").textContent =
      d.baseline.toFixed(3) + " s";
    document.querySelector("#candidate-duration").textContent =
      d.candidate.toFixed(3) + " s";
    document
      .querySelector("#baseline-bar")
      .style.setProperty("--duration-ratio", "1");
    document
      .querySelector("#candidate-bar")
      .style.setProperty("--duration-ratio", String(d.candidate / d.baseline));
    document.querySelector("#comparison-delta").textContent =
      ((1 - d.candidate / d.baseline) * 100).toFixed(1) + "%";
    document.querySelector("#comparison-memory").textContent = d.memory;
    document.querySelector("#comparison-update").textContent =
      d.label +
      ": baseline " +
      d.baseline.toFixed(3) +
      " seconds, R12 " +
      d.candidate.toFixed(3) +
      " seconds. Three same-host pairs; historical accepted result.";
  });
const copy = document.querySelector("#copy-checksum");
copy?.addEventListener("click", async () => {
  const output = document.querySelector("#copy-feedback");
  try {
    if (!navigator.clipboard?.writeText) throw Error("Clipboard unavailable");
    await navigator.clipboard.writeText(
      document.querySelector("#fixedpoint-sha").textContent.trim(),
    );
    output.textContent = "SHA-256 copied.";
  } catch {
    output.textContent = "Select the checksum to copy it manually.";
  }
});
