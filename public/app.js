const stages = {
  source: {
    title: "Bend source",
    description:
      "The front end parses modules, expands templates and checks types and permitted value uses. Success produces a checked program; failure produces a diagnostic.",
    file: "bend2/selfhost/FIR_LAWS.md",
    label: "Read the front-end contract",
  },
  fir: {
    title: "Checked program",
    description:
      "One owned source arena travels with checked modules, signatures and scope metadata. Checked occurrences retain the facts consumed by lowering.",
    file: "bend2/selfhost/checked_frontend.bend",
    label: "Inspect the checked program",
  },
  lower: {
    title: "Shared lowering",
    description:
      "The driver lowers the checked program once before selecting a target. This pass decides erasure, evaluation order, closure captures, calls and pattern control flow.",
    file: "bend2/selfhost/backend_lower.bend",
    label: "Inspect shared lowering",
  },
  bir: {
    title: "Executable program",
    description:
      "Structured blocks describe bindings, branches, returns, tail calls and lexical regions. Separate descriptors retain metadata for layout, display and host interfaces.",
    file: "bend2/selfhost/backend_ir.bend",
    label: "Inspect the backend representation",
  },
  c: {
    title: "C backend",
    description:
      "The C backend computes layouts and sharing plans, builds runtime tables, and emits executable segments and continuations. It still owns C-specific primitives and foreign-code integration.",
    file: "bend2/selfhost/c_backend.bend",
    label: "Inspect the C backend",
  },
  js: {
    title: "JavaScript backend",
    description:
      "The JavaScript backend plans continuation captures and region frames, emits functions and runtime helpers, and adapts values at host boundaries. Shared IR does not make it just a text printer.",
    file: "bend2/selfhost/js_backend.bend",
    label: "Inspect the JavaScript backend",
  },
};
const sourceBase =
  "https://github.com/IlyaGulya/bend/blob/f63679c31e3219b9fbd119625d35ec03cb2ad224/";
const stageButtons = [...document.querySelectorAll("[data-stage]")];
for (const button of stageButtons) {
  button.disabled = false;
  button.addEventListener("click", () => {
    const stage = stages[button.dataset.stage];
    if (!stage) return;
    for (const other of stageButtons)
      other.setAttribute("aria-pressed", String(other === button));
    document.querySelector("#trace-title").textContent = stage.title;
    document.querySelector("#trace-description").textContent = stage.description;
    const source = document.querySelector("#trace-source");
    source.href = sourceBase + stage.file;
    source.querySelector("span").textContent = stage.label;
  });
}
const copy = document.querySelector("#copy-checksum");
if (copy) {
  copy.hidden = false;
  copy.addEventListener("click", async () => {
    const output = document.querySelector("#copy-feedback");
    try {
      if (!navigator.clipboard?.writeText) throw Error("Clipboard unavailable");
      await navigator.clipboard.writeText(
        document.querySelector("#fixedpoint-sha").textContent.trim(),
      );
      output.textContent = "SHA-256 copied.";
    } catch {
      output.textContent = "Clipboard unavailable. Select the checksum to copy it manually.";
    }
  });
}
