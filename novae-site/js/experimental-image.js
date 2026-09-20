/*
 * <experimental-image>
 *
 * Wiederverwendbare Bildkomponente des Experiments.
 * Das <img> steht im HTML-Markup (Light DOM); die Komponente ergänzt
 * ausschließlich das KI-Label als HTML/CSS-Overlay.
 *
 * Attribut (entspricht dem Prop "showAiLabel"):
 *   show-ai-label   Label "AI" wird angezeigt
 *
 * Ohne explizites Attribut wird die Bedingung aus window.VELORA_CONDITION
 * übernommen (siehe condition.js). Das Bild selbst wird nie verändert oder
 * dupliziert. Das Label ist absolut positioniert und beeinflusst daher weder
 * Elementgröße noch Layout oder Scrollhöhe.
 */
(function () {
  var LABEL_TEXT = "AI";

  class ExperimentalImage extends HTMLElement {
    static get observedAttributes() {
      return ["show-ai-label"];
    }

    connectedCallback() {
      if (window.VELORA_CONDITION === "ai" && !this.hasAttribute("show-ai-label")) {
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
