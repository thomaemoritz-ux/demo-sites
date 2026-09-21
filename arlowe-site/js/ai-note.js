/*
 * <ai-note>
 *
 * Der Hinweis "Diese Bilder wurden mit KI generiert" steht als letzter Satz
 * der Produktbeschreibung (wie bei einem realen Shop: normaler Fließtext,
 * gleiche Schrift, kein Overlay auf den Bildern).
 *
 * Damit sich die Bedingungen ausschließlich durch die Sichtbarkeit dieses
 * Satzes unterscheiden, steht der Satz in BEIDEN Bedingungen an derselben
 * Stelle im Text:
 *   ai       -> sichtbar
 *   control  -> unsichtbar (visibility: hidden, aria-hidden), belegt aber
 *               denselben Platz. Zeilenumbrüche, Höhen und Scrollhöhe sind
 *               dadurch identisch.
 *
 * Die Bedingung stammt aus window.VELORA_CONDITION (siehe condition.js).
 * Synchron im <head> geladen, damit der Zustand im ersten Frame stimmt.
 */
(function () {
  class AiNote extends HTMLElement {
    connectedCallback() {
      var visible = window.VELORA_CONDITION === "ai";
      this.toggleAttribute("data-visible", visible);
      if (visible) {
        this.removeAttribute("aria-hidden");
      } else {
        this.setAttribute("aria-hidden", "true");
      }
    }
  }

  if (!customElements.get("ai-note")) {
    customElements.define("ai-note", AiNote);
  }
})();
