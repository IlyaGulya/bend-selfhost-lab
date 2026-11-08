const explorer = document.querySelector("[data-ir-explorer]");
const phaseButtons = [...explorer.querySelectorAll("[data-phase-choice]")];
const views = [...explorer.querySelectorAll("[data-ir-view]")];
const followButtons = [...explorer.querySelectorAll("[data-follow]")];
const nodeButtons = [...explorer.querySelectorAll("[data-node]")];
const bindingLabels = {
  k: "Following k: the value received by adder and remembered by its returned function.",
  x: "Following x: the argument received later by that returned function.",
  none: "All relationships are shown. Select a binding to follow its path.",
};
let activeView;
let pendingFrame = 0;
const narrowGraph = matchMedia("(max-width: 760px)");

function drawConnections() {
  pendingFrame = 0;
  if (!activeView) return;
  const graph = activeView.querySelector(".node-graph");
  const wires = graph.querySelector(".graph-wires");
  if (!wires) return;
  const bounds = graph.getBoundingClientRect();
  const boxes = new Map();
  const obstacles = [];
  for (const node of graph.querySelectorAll("[data-node], [data-node-note]:not([hidden])")) {
    const rect = node.getBoundingClientRect();
    const box = {
      left: rect.left - bounds.left,
      right: rect.right - bounds.left,
      top: rect.top - bounds.top,
      bottom: rect.bottom - bounds.top,
      x: rect.left - bounds.left + rect.width / 2,
      y: rect.top - bounds.top + rect.height / 2,
    };
    if (node.hasAttribute("data-node")) boxes.set(node.dataset.node, box);
    obstacles.push(box);
  }
  wires.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
  let rail = 0;
  for (const path of wires.querySelectorAll("path[data-from]")) {
    const from = boxes.get(path.dataset.from);
    const to = boxes.get(path.dataset.to);
    if (!from || !to) continue;
    let d;
    if (Math.abs(from.y - to.y) < 15) {
      const direction = to.x > from.x ? 1 : -1;
      const start = direction > 0 ? from.right : from.left;
      const end = direction > 0 ? to.left : to.right;
      let obstructed = false;
      for (const box of obstacles) {
        if (box === from || box === to) continue;
        if (box.top < from.y && box.bottom > from.y &&
            box.left >= Math.min(from.right, to.right) &&
            box.right <= Math.max(from.left, to.left)) obstructed = true;
      }
      if (obstructed) {
        const below = from.top < 22;
        const y = below ? Math.max(from.bottom, to.bottom) + 11 : Math.min(from.top, to.top) - 11;
        const a = below ? from.bottom : from.top;
        const b = below ? to.bottom : to.top;
        d = `M${from.x},${a}V${y}H${to.x}V${b}`;
      } else d = `M${start},${from.y}H${end}`;
    } else {
      const down = to.y > from.y;
      const start = down ? from.bottom : from.top;
      const end = down ? to.top : to.bottom;
      let intermediateRow = false;
      for (const box of obstacles) {
        if (box === from || box === to) continue;
        if (box.top >= Math.min(start, end) && box.bottom <= Math.max(start, end)) intermediateRow = true;
      }
      if (intermediateRow) {
        const inset = 4 + (rail++ % 3) * 4;
        const x = bounds.width < 450 ? (down ? bounds.width - inset : inset) : (down ? bounds.width + inset : -inset);
        const first = start + (down ? 8 : -8);
        const last = end + (down ? -8 : 8);
        d = `M${from.x},${start}V${first}H${x}V${last}H${to.x}V${end}`;
      } else {
        const middle = (start + end) / 2;
        d = `M${from.x},${start}V${middle}H${to.x}V${end}`;
      }
    }
    path.setAttribute("d", d);
  }
}

function scheduleConnections() {
  if (!pendingFrame) pendingFrame = requestAnimationFrame(drawConnections);
}

function selectNode(view, id) {
  let selectedButton;
  for (const button of view.querySelectorAll("[data-node]")) {
    const selected = button.dataset.node === id;
    button.setAttribute("aria-pressed", String(selected));
    if (selected) selectedButton = button;
  }
  const shelf = view.querySelector(".node-notes");
  for (const note of view.querySelectorAll("[data-node-note]")) {
    const selected = note.dataset.nodeNote === id;
    note.hidden = !selected;
    const inline = selected && narrowGraph.matches;
    note.classList.toggle("ir-inline-note", inline);
    if (inline) {
      note.setAttribute("aria-live", "polite");
      selectedButton.after(note);
    } else {
      note.removeAttribute("aria-live");
      if (note.parentElement !== shelf) shelf.append(note);
    }
  }
  scheduleConnections();
}

function followBinding(binding) {
  for (const button of followButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.follow === binding));
  }
  for (const item of explorer.querySelectorAll("[data-binding]")) {
    item.classList.toggle("is-followed", binding !== "none" && item.dataset.binding.split(" ").includes(binding));
  }
  explorer.querySelector("#binding-description").textContent = bindingLabels[binding];
}

function selectPhase(phase, updateHash = false) {
  const selected = views.find(view => view.dataset.irView === phase);
  if (!selected) return;
  activeView = selected;
  for (const view of views) view.hidden = view !== selected;
  for (const button of phaseButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.phaseChoice === phase));
  }
  explorer.querySelector("#representation-status").textContent = selected.dataset.status;
  if (updateHash) history.replaceState(null, "", `#view-${phase}`);
  scheduleConnections();
}

for (const button of phaseButtons) {
  button.disabled = false;
  button.addEventListener("click", () => selectPhase(button.dataset.phaseChoice, true));
  button.addEventListener("keydown", event => {
    const index = phaseButtons.indexOf(button);
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % phaseButtons.length;
    else if (event.key === "ArrowLeft") next = (index + phaseButtons.length - 1) % phaseButtons.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = phaseButtons.length - 1;
    else return;
    event.preventDefault();
    phaseButtons[next].focus();
    selectPhase(phaseButtons[next].dataset.phaseChoice, true);
  });
}
for (const button of followButtons) {
  button.disabled = false;
  button.addEventListener("click", () => followBinding(button.dataset.follow));
}
for (const button of nodeButtons) {
  button.disabled = false;
  button.addEventListener("click", () => {
    const view = button.closest("[data-ir-view]");
    selectNode(view, button.dataset.node);
    if (narrowGraph.matches) {
      document.getElementById(button.getAttribute("aria-controls")).scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  });
}
for (const view of views) selectNode(view, view.querySelector("[data-node]").dataset.node);
explorer.classList.add("ir-enhanced");
followBinding("k");
const initialPhase = location.hash.startsWith("#view-") ? location.hash.slice(6) : "fir";
selectPhase(views.some(view => view.dataset.irView === initialPhase) ? initialPhase : "fir");
window.addEventListener("hashchange", () => {
  if (location.hash.startsWith("#view-")) selectPhase(location.hash.slice(6));
});
narrowGraph.addEventListener("change", () => {
  for (const view of views) {
    const selected = view.querySelector("[data-node][aria-pressed=true]");
    selectNode(view, selected.dataset.node);
  }
});
const graphObserver = new ResizeObserver(scheduleConnections);
for (const graph of explorer.querySelectorAll(".node-graph")) graphObserver.observe(graph);
document.fonts.ready.then(scheduleConnections);
