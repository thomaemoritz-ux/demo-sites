/*
 * Experimentelle Bedingung (Studien-Stimulus)
 *
 * Neutrale Codes (für Teilnehmende):
 *   ?v=a  ->  Version A: keine KI-Kennzeichnung (= Control)
 *   ?v=b  ->  Version B: KI-Label "AI" auf allen Bildern
 *
 * Für Entwicklung/Tests weiterhin gültig:
 *   ?condition=control | ?condition=ai
 *
 * "v" hat Vorrang vor "condition". Ohne Parameter oder bei ungültigen
 * Werten wird Control gezeigt.
 *
 * Wird synchron im <head> geladen, damit die Bedingung feststeht,
 * bevor das erste Bild im DOM erscheint (kein Flackern).
 */
(function () {
  var params = null;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (e) {
    params = null;
  }

  var v = params ? params.get("v") : null;
  var condition = params ? params.get("condition") : null;

  var ai;
  if (v === "a" || v === "b") {
    ai = v === "b";
  } else {
    ai = condition === "ai";
  }
  window.VELORA_CONDITION = ai ? "ai" : "control";

  // Aktiviert die Reveal-Animationen nur, wenn JavaScript läuft.
  // Identisch in beiden Bedingungen.
  document.documentElement.classList.add("js");
})();
