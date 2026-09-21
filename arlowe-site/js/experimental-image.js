/*
 * <experimental-image>
 *
 * Bild-Container der Galerie. Das <img> steht im HTML-Markup (Light DOM);
 * die Komponente ergänzt ausschließlich das KI-Label als HTML/CSS-Overlay:
 * weißer, schlichter Text unten rechts in der Bildecke (ohne Kasten),
 * nach dem Vorbild eines realen Shops.
 *
 *   Label-Text: "Diese Bilder wurden von KI generiert"
 *
 * Attribute:
 *   data-ai-label   Dieses Bild trägt das Label (hier: nur das erste Bild
 *                   der Galerie, wie beim Vorbild-Shop)
 *   show-ai-label   Label wird angezeigt (entspricht dem Prop "showAiLabel")
 *
 * Ohne explizites show-ai-label wird die Bedingung aus
 * window.VELORA_CONDITION übernommen (siehe condition.js): Nur Bilder mit
 * data-ai-label zeigen das Label, und nur in Version B. Das Bild selbst wird nie verändert oder
 * dupliziert. Das Label ist absolut positioniert und beeinflusst daher weder
 * Elementgröße noch Layout oder Scrollhöhe. In Version A existiert kein
 * Label-Element im DOM.
 */
(function () {
  var LABEL_TEXT = "Diese Bilder wurden von KI generiert";

  class ExperimentalImage extends HTMLElement {
    static get observedAttributes() {
      return ["show-ai-label"];
    }

    connectedCallback() {
      if (
        window.VELORA_CONDITION === "ai" &&
        this.hasAttribute("data-ai-label") &&
        !this.hasAttribute("show-ai-label")
      ) {
        this.setAttribute("show-ai-label", "");
        return; // attributeChangedCallback rendert das Label
      }
      this._sync();
    }

    attributeChangedCallback() {
      this._sync();
    }

    _sync() {
      var label = this.querySelector(":scope > .xi__label");
      var show = this.hasAttribute("show-ai-label");

      if (show && !label) {
        label = document.createElement("span");
        label.className = "xi__label";
        label.textContent = LABEL_TEXT;
        this.appendChild(label);
      } else if (!show && label) {
        label.remove();
      }
    }
  }

  if (!customElements.get("experimental-image")) {
    customElements.define("experimental-image", ExperimentalImage);
  }
})();
