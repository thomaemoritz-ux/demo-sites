/*
 * Seiten-Interaktionen. Bedingungsunabhängig: identisches Verhalten
 * in "control" und "ai".
 */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  /* Header: transparent im Hero, hell nach dem Scrollen */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile Navigation */
  function setMenu(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }
  toggle.addEventListener("click", function () {
    setMenu(!header.classList.contains("is-open"));
  });
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* Dialoge (Dummy-Konfigurator / Probefahrt) */
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

    // Platzhalter-Links im Footer: nichts öffnen, nicht springen
    var dummy = event.target.closest("a[data-dummy]");
    if (dummy) event.preventDefault();
  });

  /* Reveal-Effekt (nur Text/Kennzahlen, nie Bilder oder Labels) */
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
