(function () {
  const root = document.documentElement;

  // Theme
  const storedTheme = localStorage.getItem("fk_theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.setAttribute("data-theme", storedTheme);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    if (btn.dataset.action === "toggle-theme") {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("fk_theme", next);
    }
  });

  // LocalStorage helpers for module pages
  const note = document.querySelector("[data-note-key]");
  if (note) {
    const key = note.getAttribute("data-note-key");
    note.value = localStorage.getItem(key) || "";
    note.addEventListener("input", () => localStorage.setItem(key, note.value));
  }

  document.querySelectorAll("[data-checklist-key]").forEach((wrap) => {
    const key = wrap.getAttribute("data-checklist-key");
    const saved = JSON.parse(localStorage.getItem(key) || "{}");

    wrap.querySelectorAll("input[type='checkbox']").forEach((cb) => {
      const id = cb.getAttribute("data-id");
      cb.checked = !!saved[id];

      cb.addEventListener("change", () => {
        saved[id] = cb.checked;
        localStorage.setItem(key, JSON.stringify(saved));
      });
    });
  });

  // Quick reset (optional button)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-reset]");
    if (!btn) return;

    const key = btn.getAttribute("data-reset");
    if (!key) return;

    localStorage.removeItem(key);
    location.reload();
  });
})();
