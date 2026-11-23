(() => {
  try {
    const s = localStorage.getItem("fulbolab-theme");
    const d = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const r = s === "light" || s === "dark" ? s : d ? "dark" : "light";
    document.documentElement.classList.toggle("dark", r === "dark");
    document.documentElement.dataset.theme = r;
    document.documentElement.style.colorScheme = r;
  } catch {}
})();
