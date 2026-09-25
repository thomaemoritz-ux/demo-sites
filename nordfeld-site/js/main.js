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

  /* Suche: springt zum passenden Produkt (findet Titel und Beschreibung) */
  var form = document.querySelector(".search");
  var input = document.getElementById("search-input");
  var msg = document.getElementById("search-msg");
  var msgTimer = null;
  var foundTimer = null;

  function normalize(text) {
    return text.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function showMessage(text) {
    msg.textContent = text;
    msg.hidden = false;
    window.clearTimeout(msgTimer);
    msgTimer = window.setTimeout(function () { msg.hidden = true; }, 4000);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelectorAll(".card.is-found").forEach(function (c) { c.classList.remove("is-found"); });
    var query = normalize(input.value);
    if (!query) return;

    var words = query.split(" ");
    var hit = null;
    document.querySelectorAll(".card").forEach(function (card) {
      if (hit) return;
      var text = normalize(card.textContent);
      if (words.every(function (w) { return text.indexOf(w) !== -1; })) hit = card;
    });

    if (!hit) {
      showMessage("Kein Treffer für „" + input.value.trim() + "“. Versuche es mit einem anderen Begriff.");
      return;
    }

    msg.hidden = true;
    hit.classList.add("is-found");
    hit.scrollIntoView({ behavior: "smooth", block: "center" });
    input.blur();
    window.clearTimeout(foundTimer);
    foundTimer = window.setTimeout(function () { hit.classList.remove("is-found"); }, 3500);
  });

  input.addEventListener("input", function () { msg.hidden = true; });

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
