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

  /* Links auf einen Aufklappbereich (<details>) öffnen diesen zusätzlich */
  function openTarget(hash) {
    if (!hash || hash.length < 2) return;
    var target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target && target.tagName === "DETAILS") target.open = true;
  }
  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (link) openTarget(link.getAttribute("href"));
  });
  window.addEventListener("hashchange", function () { openTarget(window.location.hash); });
  openTarget(window.location.hash);

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
