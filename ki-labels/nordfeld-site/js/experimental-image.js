/*
 * <experimental-image>
 *
 * Bild-Container. Das <img> steht im HTML-Markup (Light DOM); die Komponente
 * ergänzt ausschließlich das KI-Label als HTML/CSS-Overlay.
 *
 * Label: das offizielle EU-Icon "Fully AI-Generated" (schwarz) der Europäischen
 * Kommission, auf allen Seiten dieselbe Datei (assets/eu-ai-generated-black.svg).
 *
 * Attribut (entspricht dem Prop "showAiLabel"):
 *   show-ai-label   Label wird angezeigt
 *
 * Ohne explizites Attribut wird die Bedingung aus window.VELORA_CONDITION
 * übernommen (siehe condition.js).
 *
 * Das Bild selbst wird nie verändert oder dupliziert. Das Label ist absolut
 * positioniert und beeinflusst daher weder Elementgröße noch Layout oder
 * Scrollhöhe. In Version A existiert kein Label-Element im DOM, und die
 * Icon-Datei wird nicht geladen.
 */
(function () {
  var LABEL_SRC = "assets/eu-ai-generated-black.svg";
  var LABEL_ALT = "Als KI-generiert gekennzeichnet";

  // Version B: Icon früh laden, damit es zusammen mit dem Bild erscheint.
  if (window.VELORA_CONDITION === "ai") {
    new Image().src = LABEL_SRC;
  }

  class ExperimentalImage extends HTMLElement {
    static get observedAttributes() {
      return ["show-ai-label"];
    }

    connectedCallback() {
      if (
        window.VELORA_CONDITION === "ai" && !this.hasAttribute("show-ai-label")
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
        label = document.createElement("img");
        label.className = "xi__label";
        label.src = LABEL_SRC;
        label.alt = LABEL_ALT;
        label.decoding = "async";
        label.draggable = false;
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
