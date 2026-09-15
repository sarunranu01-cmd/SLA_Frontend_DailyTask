/* Shared exhibition chrome helpers */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.toggle("reduced-motion", reduced);
})();
