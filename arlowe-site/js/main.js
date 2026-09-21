/*
 * Seiten-Interaktionen. Bedingungsunabhängig: identisches Verhalten
 * in Version A und Version B.
 */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");

  /* Mobile Navigation */
  function setMenu(open) {
    header.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }
  menuBtn.addEventListener("click", function () {
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

  /* Klicks: Dialoge, Platzhalter-Links, Aufklappbereiche */
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
      return;
    }

    // Größentabelle: Bereich "Maße" öffnen
    var detailsOpener = event.target.closest("[data-open-details]");
    if (detailsOpener) {
      var details = document.getElementById(detailsOpener.getAttribute("data-open-details"));
      if (details) {
        details.open = true;
        details.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      return;
    }

    // Platzhalter-Links: nichts öffnen, nicht springen
    var dummy = event.target.closest("a[data-dummy]");
    if (dummy) event.preventDefault();
  });

  /* Formulare (Newsletter): ohne Funktion, ohne Seitenwechsel */
  document.addEventListener("submit", function (event) {
    if (event.target.closest(".newsletter__form")) event.preventDefault();
  });

  /* Größenwahl */
  var sizes = document.querySelectorAll(".size");
  sizes.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wasPressed = btn.getAttribute("aria-pressed") === "true";
      sizes.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", String(!wasPressed));
    });
  });

  /* Galerie (mobil): Pfeile und Zähler */
  var track = document.getElementById("gallery-track");
  var count = document.getElementById("gallery-count");
  if (track && count) {
    var total = track.children.length;
    var ticking = false;

    function updateCount() {
      var index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      index = Math.min(Math.max(index, 0), total - 1);
      count.textContent = (index + 1) + " / " + total;
      ticking = false;
    }
    track.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateCount);
      }
    }, { passive: true });

    document.querySelectorAll("[data-gallery]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = btn.getAttribute("data-gallery") === "next" ? 1 : -1;
        track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" });
      });
    });
  }
})();
