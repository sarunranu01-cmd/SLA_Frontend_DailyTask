/* Progress nav is semantic HTML; this only enhances mobile keyboard order if needed. */
(function () {
  document.querySelectorAll(".progress a[aria-current='page']").forEach(function (el) {
    el.setAttribute("tabindex", "0");
  });
})();
