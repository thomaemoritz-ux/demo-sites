/*
 * Seiten-Interaktionen. Bedingungsunabhängig: identisches Verhalten
 * in "control" und "ai".
 */
(function () {
  "use strict";

  var header = document.getElementById("site-header");

  /* Header: dezenter Schatten nach dem Scrollen */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Dialoge (Platzhalter für Warenkorb, Anmeldung, Filialwahl) */
  document.addEventListener("click", function (event) {
    var opener = event.target.closest("[data-open-dialog]");
    if (opener) {
      var dialog = document.getElementById(opener.getAttribute("data-open-dialog"));
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      return;
    }

    // Klick auf den Backdrop schließt den Dialog
    if (event.target instanceof HTMLDialogElement && event.target.open) {
      event.target.close();
    }

    // Platzhalter-Links: nichts öffnen, nicht springen
    var dummy = event.target.closest("a[data-dummy]");
    if (dummy) event.preventDefault();
  });

  /* Suche: in dieser Seite ohne Funktion, aber ohne Seitenwechsel */
  document.addEventListener("submit", function (event) {
    if (event.target.closest(".search")) event.preventDefault();
  });

  /* Reveal-Effekt (nur Überschriften/Textblöcke, nie Bilder oder Labels) */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
