/**
 * HtmlSvgEdu - Educational Animation Library
 * Version: 1.0.0
 * Author: Sebastian Rikowski
 * License: GNU GPLv3
 *
 * Copyright (c) 2025 Sebastian Rikowski
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

const HtmlSvgEdu = {};
HtmlSvgEdu.Component = class Component {
  static serializationMap = {
    description: {
      de: "Basis-Klasse für alle HTML UI Komponenten",
      en: "Base class for all HTML UI components",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example: "let myComponent = new Component();",
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {},
  };
  constructor() {
    this._x = 0;
    this._y = 0;
    this._element = null;
    this._visible = true;
  }
  static updateContainerScale(scaleValue) {
    const container = document.getElementById("pixi-ui-overlay");
    if (container) {
      container.style.transform = "scale(" + scaleValue + ")";
      container.style.transformOrigin = "top left";
    }
  }
  _createElement(type) {
    const element = document.createElement(type);
    element.classList.add("pixi-html-ui");
    const uiContainer =
      document.getElementById("pixi-ui-overlay") || this._createUiContainer();
    uiContainer.appendChild(element);
    this._element = element;
    this._applyPosition();
    Board[INSTANCE_KEY].addUIChild(this);
    return element;
  }
  _createUiContainer() {
    const container = document.createElement("div");
    container.id = "pixi-ui-overlay";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    document.getElementById("canvas-container").appendChild(container);
    return container;
  }
  _applyPosition() {
    if (!this._element) return;
    const boardHeight = Board[INSTANCE_KEY].height;
    this._element.style.position = "absolute";
    this._element.style.left = this._x + "px";
    this._element.style.top = this._y + "px";
  }
  set x(value) {
    this._x = value;
    this._applyPosition();
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._y = value;
    this._applyPosition();
  }
  get y() {
    return this._y;
  }
  set visible(value) {
    this._visible = value;
    if (this._element) {
      this._element.style.display = this._visible ? "block" : "none";
    }
  }
  get visible() {
    return this._visible;
  }
  remove() {
    if (this._element && this._element.parentNode) {
      this._element.parentNode.removeChild(this._element);
    }
  }
};
HtmlSvgEdu.Button = class Button extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Schaltfläche mit Klick-Event",
      en: "Button with click event",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example: 'let myButton = new Button("Click me", 100, 40);',
    constructor: {
      label: {
        name: "label",
        info: {
          en: "Label or text of the element",
          de: "Bezeichner oder Text des Elements",
        },
      },
      width: {
        name: "width",
        info: {
          en: "Width of the element in pixels",
          de: "Breite des Elements in Pixeln",
        },
      },
      height: {
        name: "height",
        info: {
          en: "Height of the element in pixels",
          de: "Höhe des Elements in Pixeln",
        },
      },
      font: {
        name: "font",
        info: {
          en: "Font family of the text",
          de: "Schriftart des Textes",
        },
      },
      fontSize: {
        name: "fontSize",
        info: {
          en: "Font size in pixels",
          de: "Schriftgröße in Pixeln",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {
      onClick: {
        name: "onClick",
        info: {
          en: "Registers a callback that is executed on click",
          de: "Registriert einen Callout, der beim Klick ausgeführt wird",
        },
        example:
          'onClick(sendMessage); \n\nfunction sendMessage() { console.log("Hallo World"); }',
      },
      setText: {
        name: "setText",
        info: {
          en: "Sets the label text of the button",
          de: "Setzt den Beschriftungstext des Buttons",
        },
        example: 'setText("Neuer Text")',
      },
    },
  };
  constructor(label, width, height, font, fontSize) {
    super();
    this._label = label;
    this._width = width;
    this._height = height;
    this._font = font || "Arial";
    this._fontSize = fontSize || 16;
    this._toggleMode = false;
    this._active = false;
    this._clickHandler = null;
    this._element = this._createElement("button");
    this._element.textContent = label;
    this._element.className = "pixi-html-ui pixi-button";
    this._applyStyles();
    this._setupEvents();
  }
  _applyStyles() {
    if (!this._element) return;
    this._element.style.width = this._width + "px";
    this._element.style.height = this._height + "px";
    this._element.style.fontFamily = this._font;
    this._element.style.fontSize = this._fontSize + "px";
    if (this._toggleMode && this._active) {
      this._element.classList.add("active");
    } else {
      this._element.classList.remove("active");
    }
  }
  _setupEvents() {
    if (!this._element) return;
    this._element.addEventListener("click", (e) => {
      if (this._toggleMode) {
        this._active = !this._active;
        this._element.classList.toggle("active", this._active);
      }
      const event = new CustomEvent("button-click", {
        detail: { component: this },
      });
      this._element.dispatchEvent(event);
      if (typeof this._clickHandler === "function") {
        this._clickHandler();
      }
    });
  }
  setText(label) {
    this._text = label;
    if (this._element) {
      this._element.textContent = label;
    }
  }
  setFont(font) {
    this._font = font;
    if (this._element) {
      this._element.style.fontFamily = font;
    }
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize;
    if (this._element) {
      this._element.style.fontSize = fontSize + "px";
    }
  }
  setToggleMode(toggleMode, active) {
    this._toggleMode = toggleMode;
    this._active = active || false;
    if (this._element) {
      this._element.classList.toggle(
        "active",
        this._toggleMode && this._active,
      );
    }
  }
  addClickListener(callback) {
    if (this._element) {
      this._element.addEventListener("button-click", callback);
    }
  }
  removeClickListener(callback) {
    if (this._element) {
      this._element.removeEventListener("button-click", callback);
    }
  }
  onClick(callout) {
    this._clickHandler = callout;
  }
};

HtmlSvgEdu.Checkbox = class Checkbox extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Kontrollkästchen mit Ein-/Ausschaltzustand",
      en: "Checkbox with on/off state",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example: 'let myCheckbox = new Checkbox(true, 20, "Select option");',
    constructor: {
      checked: {
        name: "checked",
        info: {
          en: "Indicates whether the element is selected",
          de: "Gibt an, ob das Element ausgewählt ist",
        },
      },
      size: {
        name: "size",
        info: {
          en: "Size of the element (e.g. 20 for 20px)",
          de: "Größe des Elements (z.B. 20 für 20px)",
        },
      },
      label: {
        name: "label",
        info: {
          en: "Label or text of the element (\\n for line break, <sub></sub> and <sup></sup> for subscript/superscript possible)",
          de: "Bezeichner oder Text des Elements (\\n für Zeilenwechsel, <sub></sub> und <sup></sup> für tiefgestellt/hochgestellt möglich)",
        },
      },
      font: {
        name: "font",
        info: {
          en: "Font family of the text",
          de: "Schriftart des Textes",
        },
      },
      fontSize: {
        name: "fontSize",
        info: {
          en: "Font size in pixels",
          de: "Schriftgröße in Pixeln",
        },
      },
      textColor: {
        name: "textColor",
        info: {
          en: "Text color of the label (e.g. 0x000000)",
          de: "Textfarbe des Labels (z.B. 0x000000)",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
      checked: {
        name: "checked",
        info: {
          en: "Indicates whether the element is selected (true/false)",
          de: "Gibt an, ob das Element ausgewählt ist (true/false)",
        },
        example: "checked = true",
      },
    },
    methods: {
      onClick: {
        name: "onClick",
        info: {
          en: "Adds an event listener for changes",
          de: "Fügt einen Event-Listener für Änderungen hinzu",
        },
        example:
          'onClick(handleClick); \n\nfunction handleClick(event) { console.log("Status:", event.value); }',
      },
    },
  };
  constructor(
    checked = false,
    size = 20,
    label = "Checkbox",
    font = "Arial",
    fontSize = 16,
    textColor = 0x000000,
  ) {
    super();
    this._checked = checked;
    this._size = size;
    this._label = label;
    this._font = font;
    this._fontSize = fontSize;
    this._textColor = textColor;
    this._focused = false;
    this._cssTextColor = this._hexToCSS(textColor);

    // Browser-Erkennung
    this._isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    this._isChrome =
      navigator.userAgent.toLowerCase().indexOf("chrome") > -1 &&
      navigator.userAgent.toLowerCase().indexOf("edg") === -1;
    this._isEdge = navigator.userAgent.toLowerCase().indexOf("edg") > -1;
    this._isSafari =
      navigator.userAgent.toLowerCase().indexOf("safari") > -1 &&
      !this._isChrome &&
      !this._isEdge;

    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-svg-checkbox-container";
    this._svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    this._svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this._calculateSvgSize();
    this._addStyles();
    this._createCheckboxElements();
    this._container.appendChild(this._svgElement);
    this._element = this._container;
    this._setupEvents();
  }
  _hexToCSS(hexColor) {
    const hex = hexColor.toString(16).padStart(6, "0");
    return "#" + hex;
  }
  _parseHtmlTags(text) {
    const parts = [];
    let currentPos = 0;
    const tagRegex = /<(sub|sup)>(.*?)<\/\1>/gi;
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      if (match.index > currentPos) {
        const beforeText = text.substring(currentPos, match.index);
        if (beforeText) {
          parts.push({ type: "normal", text: beforeText });
        }
      }
      parts.push({
        type: match[1].toLowerCase(),
        text: match[2],
      });
      currentPos = match.index + match[0].length;
    }
    if (currentPos < text.length) {
      const remainingText = text.substring(currentPos);
      if (remainingText) {
        parts.push({ type: "normal", text: remainingText });
      }
    }
    if (parts.length === 0) {
      parts.push({ type: "normal", text: text });
    }
    return parts;
  }
  _calculateTextDimensions() {
    const lines = this._label.split("\\n");
    let maxLineWidth = 0;
    let totalHeight = 0;
    lines.forEach((line) => {
      const parsedLine = this._parseHtmlTags(line);
      let lineWidth = 0;
      let lineHeight = this._fontSize;
      parsedLine.forEach((part) => {
        let charWidth, partHeight;
        if (part.type === "sub" || part.type === "sup") {
          const subSupSize = this._fontSize * 0.85;
          charWidth = part.text.length * (subSupSize * 0.6);
          partHeight = subSupSize;
        } else {
          charWidth = part.text.length * (this._fontSize * 0.6);
          partHeight = this._fontSize;
        }
        lineWidth += charWidth;
        lineHeight = Math.max(lineHeight, partHeight);
      });
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
      totalHeight += lineHeight;
    });
    if (lines.length > 1) {
      totalHeight += (lines.length - 1) * (this._fontSize * 0.2);
    }
    return {
      width: maxLineWidth,
      height: totalHeight,
      lineCount: lines.length,
      lines: lines,
    };
  }
  _calculateSvgSize() {
    const adaptiveSize = Math.max(this._size, this._fontSize * 0.8);
    const strokeWidth = 2;
    const strokeOffset = strokeWidth / 2;
    const textDimensions = this._calculateTextDimensions();
    const svgWidth =
      strokeOffset +
      adaptiveSize +
      strokeOffset +
      10 +
      textDimensions.width +
      20;
    const basePadding = 30;
    const extraPadding = this._fontSize > 100 ? this._fontSize * 0.3 : 0;
    const minHeight = Math.max(
      adaptiveSize + strokeWidth,
      textDimensions.height,
    );
    const svgHeight = minHeight + basePadding + extraPadding;
    this._svgElement.setAttribute("width", svgWidth);
    this._svgElement.setAttribute("height", svgHeight);
    this._svgElement.setAttribute(
      "viewBox",
      "0 0 " + svgWidth + " " + svgHeight,
    );
    this._adaptiveSize = adaptiveSize;
    this._strokeOffset = strokeOffset;
    this._textDimensions = textDimensions;
  }

  _getSubSupStyles() {
    // Browser-spezifische Anpassungen für sub/sup
    if (this._isFirefox) {
      return {
        subStyle: "baseline-shift: sub;",
        supStyle: "baseline-shift: super;",
        subDy: this._fontSize * 0.2 + 3,
        supDy: -this._fontSize * 0.3,
        subResetDy: -(this._fontSize * 0.2 + 3),
        supResetDy: this._fontSize * 0.3,
      };
    } else if (this._isChrome || this._isEdge) {
      // Chrome und Edge benötigen andere Werte
      return {
        subStyle: "baseline-shift: -25%;",
        supStyle: "baseline-shift: 40%;",
        subDy: this._fontSize * 0.1,
        supDy: -this._fontSize * 0.15,
        subResetDy: -(this._fontSize * 0.1),
        supResetDy: this._fontSize * 0.15,
      };
    } else if (this._isSafari) {
      // Safari-spezifische Anpassungen
      return {
        subStyle: "baseline-shift: -20%;",
        supStyle: "baseline-shift: 35%;",
        subDy: this._fontSize * 0.15,
        supDy: -this._fontSize * 0.2,
        subResetDy: -(this._fontSize * 0.15),
        supResetDy: this._fontSize * 0.2,
      };
    } else {
      // Fallback für andere Browser
      return {
        subStyle: "baseline-shift: sub;",
        supStyle: "baseline-shift: super;",
        subDy: this._fontSize * 0.2,
        supDy: -this._fontSize * 0.25,
        subResetDy: -(this._fontSize * 0.2),
        supResetDy: this._fontSize * 0.25,
      };
    }
  }

  _addStyles() {
    const browserStyles = this._getSubSupStyles();
    const style = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style",
    );
    style.textContent =
      "/* Checkbox-Stil */" +
      ".checkbox-container { cursor: pointer; }" +
      ".checkbox-box { " +
      "stroke: #555555; " +
      "stroke-width: 1;" +
      "fill: white;" +
      "}" +
      ".checkbox-container:hover .checkbox-box { stroke: #228B22; }" +
      ".checkbox-check {" +
      "stroke: #228B22;" +
      "stroke-width: 3;" +
      "fill: none;" +
      "stroke-linecap: round;" +
      "stroke-linejoin: round;" +
      "visibility: hidden;" +
      "}" +
      ".checkbox-checked .checkbox-check { visibility: visible; }" +
      ".checkbox-label {" +
      "font-family: " +
      this._font +
      ";" +
      "font-size: " +
      this._fontSize +
      "px;" +
      "fill: " +
      this._cssTextColor +
      ";" +
      "dominant-baseline: middle;" +
      "user-select: none;" +
      "}" +
      ".checkbox-sub {" +
      "font-size: " +
      this._fontSize * 0.85 +
      "px;" +
      browserStyles.subStyle +
      "}" +
      ".checkbox-sup {" +
      "font-size: " +
      this._fontSize * 0.85 +
      "px;" +
      browserStyles.supStyle +
      "}";
    this._svgElement.appendChild(style);
  }
  _createCheckboxElements() {
    const checkboxSize =
      this._adaptiveSize || Math.max(this._size, this._fontSize * 0.8);
    const textDimensions = this._textDimensions;
    const contentWidth = checkboxSize + 10 + textDimensions.width;
    const svgWidth = parseInt(this._svgElement.getAttribute("width"));
    const svgHeight = parseInt(this._svgElement.getAttribute("height"));
    const contentStartX = (svgWidth - contentWidth) / 2;
    const totalContentHeight = Math.max(checkboxSize, textDimensions.height);
    const contentCenterY = svgHeight / 2;
    this._checkboxGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    this._checkboxGroup.setAttribute("class", "checkbox-container");
    this._checkboxGroup.setAttribute(
      "id",
      "checkbox-" + Math.random().toString(36).substr(2, 9),
    );
    if (this._checked) {
      this._checkboxGroup.classList.add("checkbox-checked");
    }
    const checkboxX = contentStartX;
    const checkboxY = contentCenterY - checkboxSize / 2;
    // Path-Element für abgerundete Ecken verwenden (Firefox-kompatibel)
    const radius = 3; // Radius für abgerundete Ecken
    const r = Math.min(radius, checkboxSize / 2); // Sicherstellen, dass Radius nicht zu groß ist

    // Path-Daten für abgerundetes Rechteck
    const pathData = `
      M ${checkboxX + r} ${checkboxY}
      L ${checkboxX + checkboxSize - r} ${checkboxY}
      Q ${checkboxX + checkboxSize} ${checkboxY} ${checkboxX + checkboxSize} ${checkboxY + r}
      L ${checkboxX + checkboxSize} ${checkboxY + checkboxSize - r}
      Q ${checkboxX + checkboxSize} ${checkboxY + checkboxSize} ${checkboxX + checkboxSize - r} ${checkboxY + checkboxSize}
      L ${checkboxX + r} ${checkboxY + checkboxSize}
      Q ${checkboxX} ${checkboxY + checkboxSize} ${checkboxX} ${checkboxY + checkboxSize - r}
      L ${checkboxX} ${checkboxY + r}
      Q ${checkboxX} ${checkboxY} ${checkboxX + r} ${checkboxY}
      Z
    `
      .trim()
      .replace(/\s+/g, " ");

    this._box = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this._box.setAttribute("d", pathData);
    this._box.setAttribute("class", "checkbox-box");
    this._checkboxGroup.appendChild(this._box);
    this._checkmark = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    this._checkmark.setAttribute("class", "checkbox-check");
    this._checkmark.setAttribute(
      "d",
      "M " +
        (checkboxX + checkboxSize * 0.25) +
        " " +
        (checkboxY + checkboxSize * 0.55) +
        " L " +
        (checkboxX + checkboxSize * 0.45) +
        " " +
        (checkboxY + checkboxSize * 0.75) +
        " L " +
        (checkboxX + checkboxSize * 0.75) +
        " " +
        (checkboxY + checkboxSize * 0.25),
    );
    this._checkboxGroup.appendChild(this._checkmark);
    this._createStyledLabel(checkboxX, checkboxSize, contentCenterY);
    this._svgElement.appendChild(this._checkboxGroup);
  }
  _createStyledLabel(checkboxX, checkboxSize, contentCenterY) {
    const textX = checkboxX + checkboxSize + 10;
    const lines = this._label.split("\\n");
    const lineHeight = this._fontSize * 1.2;
    const totalTextHeight = lines.length * lineHeight;
    const textCenteringDelta = -(this._fontSize * 0.2);
    const textStartY =
      contentCenterY - totalTextHeight / 2 + textCenteringDelta;
    const browserStyles = this._getSubSupStyles();

    lines.forEach((line, lineIndex) => {
      const textElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      textElement.setAttribute("class", "checkbox-label");
      textElement.setAttribute("x", textX.toString());
      textElement.setAttribute(
        "y",
        (
          textStartY +
          (lineIndex + 0.5) * lineHeight +
          this._fontSize * 0.3
        ).toString(),
      );
      textElement.setAttribute("dominant-baseline", "middle");
      const parsedLine = this._parseHtmlTags(line);
      if (parsedLine.length === 1 && parsedLine[0].type === "normal") {
        textElement.textContent = parsedLine[0].text;
      } else {
        let currentX = 0;
        parsedLine.forEach((part) => {
          const tspan = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan",
          );
          tspan.textContent = part.text;
          if (currentX > 0) {
            tspan.setAttribute("dx", "0");
          }
          if (part.type === "sub") {
            tspan.setAttribute("class", "checkbox-sub");
            tspan.setAttribute("dy", browserStyles.subDy);
          } else if (part.type === "sup") {
            tspan.setAttribute("class", "checkbox-sup");
            tspan.setAttribute("dy", browserStyles.supDy);
          } else {
            if (lineIndex > 0 || parsedLine.indexOf(part) > 0) {
              const prevPart = parsedLine[parsedLine.indexOf(part) - 1];
              if (
                prevPart &&
                (prevPart.type === "sub" || prevPart.type === "sup")
              ) {
                tspan.setAttribute(
                  "dy",
                  prevPart.type === "sub"
                    ? browserStyles.subResetDy
                    : browserStyles.supResetDy,
                );
              }
            }
          }
          textElement.appendChild(tspan);
          const charWidth =
            part.type === "normal"
              ? this._fontSize * 0.6
              : this._fontSize * 0.85 * 0.6;
          currentX += part.text.length * charWidth;
        });
      }
      this._checkboxGroup.appendChild(textElement);
    });
  }
  _createMultilineLabel(checkboxSize, yOffset, totalHeight) {}
  _setupEvents() {
    this._checkboxGroup.addEventListener("click", (e) => {
      this.checked = !this._checked;
      const customEvent = new CustomEvent("checkbox-change", {
        detail: { component: this, checked: this._checked },
      });
      customEvent.value = this._checked;
      this._element.dispatchEvent(customEvent);
    });
    this._container.tabIndex = 0;
    this._container.addEventListener("focus", () => {
      this._focused = true;
    });
    this._container.addEventListener("blur", () => {
      this._focused = false;
    });
    this._container.addEventListener("keydown", (e) => {
      if (e.key === " " || e.keyCode === 32) {
        e.preventDefault();
        this.checked = !this._checked;
        const customEvent = new CustomEvent("checkbox-change", {
          detail: { component: this, checked: this._checked },
        });
        customEvent.value = this._checked;
        this._element.dispatchEvent(customEvent);
      }
    });
  }
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    if (this._checkboxGroup) {
      if (value) {
        this._checkboxGroup.classList.add("checkbox-checked");
      } else {
        this._checkboxGroup.classList.remove("checkbox-checked");
      }
    }
  }
  setFont(font) {
    this._font = font;
    this._updateStyles();
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize;
    this._calculateSvgSize();
    this._repositionElements();
    this._updateStyles();
  }
  setLabel(label) {
    this._label = label;
    this._calculateSvgSize();
    this._repositionElements();
  }
  setTextColor(textColor) {
    this._textColor = textColor;
    this._cssTextColor = this._hexToCSS(textColor);
    this._updateStyles();
  }
  _updateStyles() {
    const oldStyle = this._svgElement.querySelector("style");
    if (oldStyle) {
      oldStyle.remove();
    }
    this._addStyles();
  }
  _repositionElements() {
    if (this._checkboxGroup) {
      this._checkboxGroup.remove();
      this._adaptiveSize = Math.max(this._size, this._fontSize * 0.8);
      this._createCheckboxElements();
    }
  }
  onClick(callback) {
    if (this._element) {
      this._element.addEventListener("checkbox-change", callback);
    }
  }
};

HtmlSvgEdu.RadioButton = class RadioButton extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Optionsfeld für Gruppenauswahl",
      en: "Radio button for group selection",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example: 'let myRadio = new RadioButton("group1", false, 20, "Option 1");',
    constructor: {
      groupName: {
        name: "groupName",
        info: {
          en: "Name of the radio button group (radio buttons with the same name belong together)",
          de: "Name der Radiobutton-Gruppe (Radiobuttons mit gleichem Namen gehören zusammen)",
        },
      },
      checked: {
        name: "checked",
        info: {
          en: "Indicates whether the element is selected",
          de: "Gibt an, ob das Element ausgewählt ist",
        },
      },
      size: {
        name: "size",
        info: {
          en: "Size of the element (e.g. 20 for 20px)",
          de: "Größe des Elements (z.B. 20 für 20px)",
        },
      },
      label: {
        name: "label",
        info: {
          en: "Label or text of the element (\\n for line break, <sub></sub> and <sup></sup> for subscript/superscript possible)",
          de: "Bezeichner oder Text des Elements (\\n für Zeilenwechsel, <sub></sub> und <sup></sup> für tiefgestellt/hochgestellt möglich)",
        },
      },
      font: {
        name: "font",
        info: {
          en: "Font family of the text",
          de: "Schriftart des Textes",
        },
      },
      fontSize: {
        name: "fontSize",
        info: {
          en: "Font size in pixels",
          de: "Schriftgröße in Pixeln",
        },
      },
      textColor: {
        name: "textColor",
        info: {
          en: "Text color of the label (e.g. 0x000000)",
          de: "Textfarbe des Labels (z.B. 0x000000)",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {
      onClick: {
        name: "onClick",
        info: {
          en: "Adds an event listener for clicks",
          de: "Fügt einen Event-Listener für Klicks hinzu",
        },
        example:
          'onClick(sendMessage); \n\nfunction sendMessage() { console.log("Hallo World"); }',
      },
    },
  };
  static _groups = new Map();
  constructor(
    groupName = "default",
    checked = false,
    size = 20,
    label = "RadioButton",
    font = "Arial",
    fontSize = 16,
    textColor = 0x000000,
  ) {
    super();
    this._groupName = groupName;
    this._checked = checked;
    this._size = size;
    this._label = label;
    this._font = font;
    this._fontSize = fontSize;
    this._textColor = textColor;
    this._focused = false;
    this._cssTextColor = this._hexToCSS(textColor);
    this._clickCallback = null;

    // Browser-Erkennung
    this._isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    this._isChrome =
      navigator.userAgent.toLowerCase().indexOf("chrome") > -1 &&
      navigator.userAgent.toLowerCase().indexOf("edg") === -1;
    this._isEdge = navigator.userAgent.toLowerCase().indexOf("edg") > -1;
    this._isSafari =
      navigator.userAgent.toLowerCase().indexOf("safari") > -1 &&
      !this._isChrome &&
      !this._isEdge;

    this._registerInGroup();
    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-svg-radiobutton-container";
    this._svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    this._svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this._calculateSvgSize();
    this._addStyles();
    this._createRadioButtonElements();
    this._container.appendChild(this._svgElement);
    this._element = this._container;
    this._setupEvents();
    if (this._checked) {
      this._setAsCheckedInGroup();
    }
  }
  _registerInGroup() {
    if (!RadioButton._groups.has(this._groupName)) {
      RadioButton._groups.set(this._groupName, new Set());
    }
    RadioButton._groups.get(this._groupName).add(this);
  }
  _unregisterFromGroup() {
    if (RadioButton._groups.has(this._groupName)) {
      RadioButton._groups.get(this._groupName).delete(this);
      if (RadioButton._groups.get(this._groupName).size === 0) {
        RadioButton._groups.delete(this._groupName);
      }
    }
  }
  _setAsCheckedInGroup() {
    if (RadioButton._groups.has(this._groupName)) {
      const group = RadioButton._groups.get(this._groupName);
      group.forEach((radioButton) => {
        if (radioButton !== this) {
          radioButton._setCheckedState(false);
        }
      });
    }
  }
  _setCheckedState(checked) {
    this._checked = checked;
    if (this._radioButtonGroup) {
      if (checked) {
        this._radioButtonGroup.classList.add("radiobutton-checked");
      } else {
        this._radioButtonGroup.classList.remove("radiobutton-checked");
      }
    }
  }
  _hexToCSS(hexColor) {
    const hex = hexColor.toString(16).padStart(6, "0");
    return "#" + hex;
  }
  _parseHtmlTags(text) {
    const parts = [];
    let currentPos = 0;
    const tagRegex = /<(sub|sup)>(.*?)<\/\1>/gi;
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      if (match.index > currentPos) {
        const beforeText = text.substring(currentPos, match.index);
        if (beforeText) {
          parts.push({ type: "normal", text: beforeText });
        }
      }
      parts.push({
        type: match[1].toLowerCase(),
        text: match[2],
      });
      currentPos = match.index + match[0].length;
    }
    if (currentPos < text.length) {
      const remainingText = text.substring(currentPos);
      if (remainingText) {
        parts.push({ type: "normal", text: remainingText });
      }
    }
    if (parts.length === 0) {
      parts.push({ type: "normal", text: text });
    }
    return parts;
  }
  _calculateTextDimensions() {
    const lines = this._label.split("\\n");
    let maxLineWidth = 0;
    let totalHeight = 0;
    lines.forEach((line) => {
      const parsedLine = this._parseHtmlTags(line);
      let lineWidth = 0;
      let lineHeight = this._fontSize;
      parsedLine.forEach((part) => {
        let charWidth, partHeight;
        if (part.type === "sub" || part.type === "sup") {
          const subSupSize = this._fontSize * 0.85;
          charWidth = part.text.length * (subSupSize * 0.6);
          partHeight = subSupSize;
        } else {
          charWidth = part.text.length * (this._fontSize * 0.6);
          partHeight = this._fontSize;
        }
        lineWidth += charWidth;
        lineHeight = Math.max(lineHeight, partHeight);
      });
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
      totalHeight += lineHeight;
    });
    if (lines.length > 1) {
      totalHeight += (lines.length - 1) * (this._fontSize * 0.2);
    }
    return {
      width: maxLineWidth,
      height: totalHeight,
      lineCount: lines.length,
      lines: lines,
    };
  }
  _calculateSvgSize() {
    const adaptiveSize = Math.max(this._size, this._fontSize * 0.8);
    const strokeWidth = 2;
    const strokeOffset = strokeWidth / 2;
    const textDimensions = this._calculateTextDimensions();
    const svgWidth =
      strokeOffset +
      adaptiveSize +
      strokeOffset +
      10 +
      textDimensions.width +
      20;
    const basePadding = 30;
    const extraPadding = this._fontSize > 100 ? this._fontSize * 0.3 : 0;
    const minHeight = Math.max(
      adaptiveSize + strokeWidth,
      textDimensions.height,
    );
    const svgHeight = minHeight + basePadding + extraPadding;
    this._svgElement.setAttribute("width", svgWidth);
    this._svgElement.setAttribute("height", svgHeight);
    this._svgElement.setAttribute(
      "viewBox",
      "0 0 " + svgWidth + " " + svgHeight,
    );
    this._adaptiveSize = adaptiveSize;
    this._strokeOffset = strokeOffset;
    this._textDimensions = textDimensions;
  }

  _getSubSupStyles() {
    // Browser-spezifische Anpassungen für sub/sup
    if (this._isFirefox) {
      return {
        subStyle: "baseline-shift: sub;",
        supStyle: "baseline-shift: super;",
        subDy: this._fontSize * 0.2 + 3,
        supDy: -this._fontSize * 0.3,
        subResetDy: -(this._fontSize * 0.2 + 3),
        supResetDy: this._fontSize * 0.3,
      };
    } else if (this._isChrome || this._isEdge) {
      // Chrome und Edge benötigen andere Werte
      return {
        subStyle: "baseline-shift: -25%;",
        supStyle: "baseline-shift: 40%;",
        subDy: this._fontSize * 0.1,
        supDy: -this._fontSize * 0.15,
        subResetDy: -(this._fontSize * 0.1),
        supResetDy: this._fontSize * 0.15,
      };
    } else if (this._isSafari) {
      // Safari-spezifische Anpassungen
      return {
        subStyle: "baseline-shift: -20%;",
        supStyle: "baseline-shift: 35%;",
        subDy: this._fontSize * 0.15,
        supDy: -this._fontSize * 0.2,
        subResetDy: -(this._fontSize * 0.15),
        supResetDy: this._fontSize * 0.2,
      };
    } else {
      // Fallback für andere Browser
      return {
        subStyle: "baseline-shift: sub;",
        supStyle: "baseline-shift: super;",
        subDy: this._fontSize * 0.2,
        supDy: -this._fontSize * 0.25,
        subResetDy: -(this._fontSize * 0.2),
        supResetDy: this._fontSize * 0.25,
      };
    }
  }

  _addStyles() {
    const browserStyles = this._getSubSupStyles();
    const style = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style",
    );
    style.textContent =
      "/* RadioButton-Stil */" +
      ".radiobutton-container { cursor: pointer; }" +
      ".radiobutton-circle { " +
      "stroke: #555555; " +
      "stroke-width: 1;" +
      "fill: white;" +
      "}" +
      ".radiobutton-container:hover .radiobutton-circle { stroke: #228B22; }" +
      ".radiobutton-dot {" +
      "fill: #228B22;" +
      "visibility: hidden;" +
      "}" +
      ".radiobutton-checked .radiobutton-dot { visibility: visible; }" +
      ".radiobutton-label {" +
      "font-family: " +
      this._font +
      ";" +
      "font-size: " +
      this._fontSize +
      "px;" +
      "fill: " +
      this._cssTextColor +
      ";" +
      "dominant-baseline: middle;" +
      "user-select: none;" +
      "}" +
      ".radiobutton-sub {" +
      "font-size: " +
      this._fontSize * 0.85 +
      "px;" +
      browserStyles.subStyle +
      "}" +
      ".radiobutton-sup {" +
      "font-size: " +
      this._fontSize * 0.85 +
      "px;" +
      browserStyles.supStyle +
      "}";
    this._svgElement.appendChild(style);
  }
  _createRadioButtonElements() {
    const radioButtonSize =
      this._adaptiveSize || Math.max(this._size, this._fontSize * 0.8);
    const textDimensions = this._textDimensions;
    const contentWidth = radioButtonSize + 10 + textDimensions.width;
    const svgWidth = parseInt(this._svgElement.getAttribute("width"));
    const svgHeight = parseInt(this._svgElement.getAttribute("height"));
    const contentStartX = (svgWidth - contentWidth) / 2;
    const totalContentHeight = Math.max(radioButtonSize, textDimensions.height);
    const contentCenterY = svgHeight / 2;
    this._radioButtonGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    this._radioButtonGroup.setAttribute("class", "radiobutton-container");
    this._radioButtonGroup.setAttribute(
      "id",
      "radiobutton-" + Math.random().toString(36).substr(2, 9),
    );
    if (this._checked) {
      this._radioButtonGroup.classList.add("radiobutton-checked");
    }
    const radioButtonX = contentStartX + radioButtonSize / 2;
    const radioButtonY = contentCenterY;
    this._circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    this._circle.setAttribute("class", "radiobutton-circle");
    this._circle.setAttribute("cx", radioButtonX.toString());
    this._circle.setAttribute("cy", radioButtonY.toString());
    this._circle.setAttribute("r", (radioButtonSize / 2).toString());
    this._radioButtonGroup.appendChild(this._circle);
    this._dot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    this._dot.setAttribute("class", "radiobutton-dot");
    this._dot.setAttribute("cx", radioButtonX.toString());
    this._dot.setAttribute("cy", radioButtonY.toString());
    this._dot.setAttribute("r", (radioButtonSize / 6).toString());
    this._radioButtonGroup.appendChild(this._dot);
    this._createStyledLabel(contentStartX, radioButtonSize, contentCenterY);
    this._svgElement.appendChild(this._radioButtonGroup);
  }
  _createStyledLabel(radioButtonX, radioButtonSize, contentCenterY) {
    const textX = radioButtonX + radioButtonSize + 10;
    const lines = this._label.split("\\n");
    const lineHeight = this._fontSize * 1.2;
    const totalTextHeight = lines.length * lineHeight;
    const textCenteringDelta = -(this._fontSize * 0.2);
    const textStartY =
      contentCenterY - totalTextHeight / 2 + textCenteringDelta;
    const browserStyles = this._getSubSupStyles();

    lines.forEach((line, lineIndex) => {
      const textElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      textElement.setAttribute("class", "radiobutton-label");
      textElement.setAttribute("x", textX.toString());
      textElement.setAttribute(
        "y",
        (
          textStartY +
          (lineIndex + 0.5) * lineHeight +
          this._fontSize * 0.3
        ).toString(),
      );
      textElement.setAttribute("dominant-baseline", "middle");
      const parsedLine = this._parseHtmlTags(line);
      if (parsedLine.length === 1 && parsedLine[0].type === "normal") {
        textElement.textContent = parsedLine[0].text;
      } else {
        let currentX = 0;
        parsedLine.forEach((part) => {
          const tspan = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan",
          );
          tspan.textContent = part.text;
          if (currentX > 0) {
            tspan.setAttribute("dx", "0");
          }
          if (part.type === "sub") {
            tspan.setAttribute("class", "radiobutton-sub");
            tspan.setAttribute("dy", browserStyles.subDy);
          } else if (part.type === "sup") {
            tspan.setAttribute("class", "radiobutton-sup");
            tspan.setAttribute("dy", browserStyles.supDy);
          } else {
            if (lineIndex > 0 || parsedLine.indexOf(part) > 0) {
              const prevPart = parsedLine[parsedLine.indexOf(part) - 1];
              if (
                prevPart &&
                (prevPart.type === "sub" || prevPart.type === "sup")
              ) {
                tspan.setAttribute(
                  "dy",
                  prevPart.type === "sub"
                    ? browserStyles.subResetDy
                    : browserStyles.supResetDy,
                );
              }
            }
          }
          textElement.appendChild(tspan);
          const charWidth =
            part.type === "normal"
              ? this._fontSize * 0.6
              : this._fontSize * 0.85 * 0.6;
          currentX += part.text.length * charWidth;
        });
      }
      this._radioButtonGroup.appendChild(textElement);
    });
  }
  _setupEvents() {
    this._radioButtonGroup.addEventListener("click", (e) => {
      if (!this._checked) {
        this.checked = true;
      }

      // Call the onClick callback if it exists
      if (this._clickCallback) {
        this._clickCallback();
      }
    });
    this._container.tabIndex = 0;
    this._container.addEventListener("focus", () => {
      this._focused = true;
    });
    this._container.addEventListener("blur", () => {
      this._focused = false;
    });
    this._container.addEventListener("keydown", (e) => {
      if (e.key === " " || e.keyCode === 32) {
        e.preventDefault();
        if (!this._checked) {
          this.checked = true;
        }

        // Call the onClick callback if it exists
        if (this._clickCallback) {
          this._clickCallback();
        }
      } else if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        this._navigateInGroup(e.key);
        e.preventDefault();
      }
    });
  }
  _navigateInGroup(keyDirection) {
    if (!RadioButton._groups.has(this._groupName)) return;
    const group = Array.from(RadioButton._groups.get(this._groupName));
    const currentIndex = group.indexOf(this);
    if (currentIndex === -1) return;
    let nextIndex;
    if (keyDirection === "ArrowUp" || keyDirection === "ArrowLeft") {
      nextIndex = currentIndex === 0 ? group.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex === group.length - 1 ? 0 : currentIndex + 1;
    }
    const nextRadioButton = group[nextIndex];
    nextRadioButton._container.focus();
    nextRadioButton.checked = true;

    // Call the onClick callback of the next radio button if it exists
    if (nextRadioButton._clickCallback) {
      nextRadioButton._clickCallback();
    }
  }
  get checked() {
    return this._checked;
  }
  set checked(value) {
    if (value && !this._checked) {
      this._setAsCheckedInGroup();
      this._setCheckedState(true);
    } else if (!value) {
      this._setCheckedState(false);
    }
  }
  get groupName() {
    return this._groupName;
  }
  get value() {
    return this._label;
  }
  static getCheckedInGroup(groupName) {
    if (!RadioButton._groups.has(groupName)) return null;
    const group = RadioButton._groups.get(groupName);
    for (const radioButton of group) {
      if (radioButton.checked) {
        return radioButton;
      }
    }
    return null;
  }
  static getValueInGroup(groupName) {
    const checked = RadioButton.getCheckedInGroup(groupName);
    return checked ? checked.value : null;
  }
  static getAllInGroup(groupName) {
    if (!RadioButton._groups.has(groupName)) return [];
    return Array.from(RadioButton._groups.get(groupName));
  }
  setFont(font) {
    this._font = font;
    this._updateStyles();
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize;
    this._calculateSvgSize();
    this._repositionElements();
    this._updateStyles();
  }
  setLabel(label) {
    this._label = label;
    this._calculateSvgSize();
    this._repositionElements();
  }
  setTextColor(textColor) {
    this._textColor = textColor;
    this._cssTextColor = this._hexToCSS(textColor);
    this._updateStyles();
  }
  _updateStyles() {
    const oldStyle = this._svgElement.querySelector("style");
    if (oldStyle) {
      oldStyle.remove();
    }
    this._addStyles();
  }
  _repositionElements() {
    if (this._radioButtonGroup) {
      this._radioButtonGroup.remove();
      this._adaptiveSize = Math.max(this._size, this._fontSize * 0.8);
      this._createRadioButtonElements();
    }
  }
  onClick(callback) {
    this._clickCallback = callback;
  }
  destroy() {
    this._unregisterFromGroup();
    if (this._element && this._element.parentNode) {
      this._element.parentNode.removeChild(this._element);
    }
    if (super.destroy) {
      super.destroy();
    }
  }
};
HtmlSvgEdu.NumericStepper = class NumericStepper extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Numerischer Stepper mit Plus/Minus-Buttons",
      en: "Numeric stepper with plus/minus buttons",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example: "let myStepper = new NumericStepper(50, 0, 100, 5, 120);",
    constructor: {
      value: {
        name: "value",
        info: {
          en: "Current value of the element",
          de: "Aktueller Wert des Elements",
        },
      },
      min: {
        name: "min",
        info: {
          en: "Minimum value of the element",
          de: "Minimaler Wert des Elements",
        },
      },
      max: {
        name: "max",
        info: {
          en: "Maximum value of the element",
          de: "Maximaler Wert des Elements",
        },
      },
      step: {
        name: "step",
        info: {
          en: "Step size of the element",
          de: "Schrittgröße des Elements",
        },
      },
      width: {
        name: "width",
        info: {
          en: "Width of the element in pixels",
          de: "Breite des Elements in Pixeln",
        },
      },
      font: {
        name: "font",
        info: {
          en: "Font family of the text",
          de: "Schriftart des Textes",
        },
      },
      fontSize: {
        name: "fontSize",
        info: {
          en: "Font size in pixels",
          de: "Schriftgröße in Pixeln",
        },
      },
      decimalSeparator: {
        name: "decimalSeparator",
        info: {
          en: "Decimal separator character (, or .)",
          de: "Dezimaltrennzeichen (, oder .)",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {
      onChange: {
        name: "onChange",
        info: {
          en: "Adds an event listener for value changes",
          de: "Fügt einen Event-Listener für Wertänderungen hinzu",
        },
        example:
          "onChange(handleChange);\n\nfunction handleChange(event) {  console.log(event.newValue); }",
      },
    },
  };
  constructor(value, min, max, step, width, font, fontSize, decimalSeparator) {
    super();
    this._value = value || 0;
    this._min = min !== undefined ? min : Number.MIN_SAFE_INTEGER;
    this._max = max !== undefined ? max : Number.MAX_SAFE_INTEGER;
    this._step = step || 1;
    this._width = width || 120;
    this._font = font || "Arial";
    this._fontSize = fontSize || 16;
    this._decimalSeparator = decimalSeparator || ".";
    this._holdTimer = null;
    this._holdInterval = null;
    this._holdDirection = 0;
    this._initialHoldDelay = 500;
    this._holdRepeatRate = 100;
    this._decimals = this._calculateDecimals(this._step);
    this._oldValue = this._value; // Speichern des alten Wertes für Events
    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-numeric-stepper";
    this._input = document.createElement("input");
    this._input.type = "text";
    this._input.value = this._formatValue(this._roundValue(value));
    this._input.className = "pixi-numeric-input";
    this._container.appendChild(this._input);
    this._buttonsContainer = document.createElement("div");
    this._buttonsContainer.className = "pixi-stepper-buttons";
    this._increaseBtn = document.createElement("button");
    this._increaseBtn.innerHTML =
      "<svg width='12' height='8' viewBox='0 0 12 8'>" +
      "<path d='M6 0 L12 8 L0 8 Z' fill='currentColor'/>" +
      "</svg>";
    this._increaseBtn.className = "pixi-stepper-btn pixi-stepper-increase";
    this._buttonsContainer.appendChild(this._increaseBtn);
    this._decreaseBtn = document.createElement("button");
    this._decreaseBtn.innerHTML =
      "<svg width='12' height='8' viewBox='0 0 12 8'>" +
      "<path d='M6 8 L0 0 L12 0 Z' fill='currentColor'/>" +
      "</svg>";
    this._decreaseBtn.className = "pixi-stepper-btn pixi-stepper-decrease";
    this._buttonsContainer.appendChild(this._decreaseBtn);
    this._container.appendChild(this._buttonsContainer);
    this._element = this._container;
    this._applyStyles();
    this._setupEvents();
  }
  _calculateDecimals(step) {
    const stepStr = step.toString();
    const decimalIndex = stepStr.indexOf(".");
    if (decimalIndex === -1) {
      return 0;
    }
    return stepStr.length - decimalIndex - 1;
  }
  _roundValue(value) {
    const factor = Math.pow(10, this._decimals);
    return Math.round(value * factor) / factor;
  }
  _formatValue(value) {
    let formattedValue = value.toFixed(this._decimals);
    if (this._decimalSeparator === ",") {
      formattedValue = formattedValue.replace(".", ",");
    }
    return formattedValue;
  }
  _parseValue(valueStr) {
    if (typeof valueStr !== "string") {
      valueStr = String(valueStr);
    }
    const normalizedValue = valueStr.replace(",", ".");
    return parseFloat(normalizedValue) || 0;
  }
  _applyStyles() {
    if (!this._element) return;
    const baseHeight = this._fontSize * 1.5;
    const buttonWidth = Math.max(22, this._fontSize * 1.2);
    this._container.style.display = "flex";
    this._container.style.width = this._width + "px";
    this._container.style.height = baseHeight + "px";
    this._input.style.fontFamily = this._font;
    this._input.style.fontSize = this._fontSize + "px";
    this._input.style.width = this._width - buttonWidth + "px";
    this._input.style.height = "100%";
    this._input.style.boxSizing = "border-box";
    this._buttonsContainer.style.display = "flex";
    this._buttonsContainer.style.flexDirection = "column";
    this._buttonsContainer.style.width = buttonWidth + "px";
    this._buttonsContainer.style.height = "100%";
    const btnStyle = {
      fontFamily: this._font,
      fontSize: Math.floor(this._fontSize * 0.8) + "px",
      padding: "0",
      margin: "0",
      lineHeight: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50%",
      boxSizing: "border-box",
    };
    Object.entries(btnStyle).forEach(
      function ([key, value]) {
        this._decreaseBtn.style[key] = value;
        this._increaseBtn.style[key] = value;
      }.bind(this),
    );
  }
  _startHold(direction) {
    this._stopHold();
    this._holdDirection = direction;
    this._performStepAction(direction);
    this._holdTimer = setTimeout(() => {
      this._holdInterval = setInterval(() => {
        this._performStepAction(this._holdDirection);
      }, this._holdRepeatRate);
    }, this._initialHoldDelay);
  }
  _stopHold() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    if (this._holdInterval) {
      clearInterval(this._holdInterval);
      this._holdInterval = null;
    }
    this._holdDirection = 0;
  }
  _performStepAction(direction) {
    const currentValue = this._parseValue(this._input.value);
    this._oldValue = this._value; // Alten Wert speichern
    if (direction === 1) {
      this._value = this._roundValue(currentValue + this._step);
    } else if (direction === -1) {
      this._value = this._roundValue(currentValue - this._step);
    }
    this._validateValue();
    this._input.value = this._formatValue(this._value);
    this._triggerChangeEvent();
  }
  _triggerChangeEvent() {
    const event = new CustomEvent("stepper-change", {
      detail: {
        component: this,
        value: this._value,
        oldValue: this._oldValue,
        newValue: this._value, // Für Kompatibilität mit der Dokumentation
      },
    });
    // Erweitern des Events um die Properties für direkten Zugriff
    event.oldValue = this._oldValue;
    event.newValue = this._value;
    this._element.dispatchEvent(event);
  }
  _setupEvents() {
    this._input.addEventListener("change", (e) => {
      const parsedValue = this._parseValue(this._input.value);
      this._oldValue = this._value; // Alten Wert speichern
      this._value = this._roundValue(parsedValue);
      this._validateValue();
      this._triggerChangeEvent();
    });
    this._input.addEventListener("input", (e) => {
      const allowedChars = new RegExp(
        "^-?\\d*\\" + this._decimalSeparator + "?\\d*$",
      );
      if (!allowedChars.test(this._input.value)) {
        this._input.value = this._input.value.slice(0, -1);
      }
    });
    this._decreaseBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this._startHold(-1);
    });
    this._decreaseBtn.addEventListener("mouseup", (e) => {
      this._stopHold();
    });
    this._decreaseBtn.addEventListener("mouseleave", (e) => {
      this._stopHold();
    });
    this._increaseBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this._startHold(1);
    });
    this._increaseBtn.addEventListener("mouseup", (e) => {
      this._stopHold();
    });
    this._increaseBtn.addEventListener("mouseleave", (e) => {
      this._stopHold();
    });
    document.addEventListener("mouseup", () => {
      this._stopHold();
    });
    this._decreaseBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this._startHold(-1);
    });
    this._decreaseBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this._stopHold();
    });
    this._decreaseBtn.addEventListener("touchcancel", (e) => {
      this._stopHold();
    });
    this._increaseBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this._startHold(1);
    });
    this._increaseBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this._stopHold();
    });
    this._increaseBtn.addEventListener("touchcancel", (e) => {
      this._stopHold();
    });
  }
  _validateValue() {
    if (this._value < this._min) this._value = this._min;
    if (this._value > this._max) this._value = this._max;
    this._value = this._roundValue(this._value);
    if (this._input) {
      this._input.value = this._formatValue(this._value);
    }
  }
  setValue(value) {
    this._oldValue = this._value; // Alten Wert speichern
    this._value = this._roundValue(Number(value));
    this._validateValue();
    this._triggerChangeEvent();
  }
  setMin(min) {
    this._min = Number(min);
    this._validateValue();
  }
  setMax(max) {
    this._max = Number(max);
    this._validateValue();
  }
  setStep(step) {
    this._step = Number(step);
    this._decimals = this._calculateDecimals(this._step);
    this._value = this._roundValue(this._value);
    this._validateValue();
  }
  setFont(font) {
    this._font = font;
    this._applyStyles();
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize;
    this._applyStyles();
    if (this._element) {
      const baseHeight = this._fontSize * 1.5;
      this._container.style.height = baseHeight + "px";
    }
  }
  setDecimalSeparator(separator) {
    if (separator === "," || separator === ".") {
      this._decimalSeparator = separator;
      if (this._input) {
        this._input.value = this._formatValue(this._value);
      }
    }
  }
  setHoldTimings(initialDelay, repeatRate) {
    this._initialHoldDelay = initialDelay || 500;
    this._holdRepeatRate = repeatRate || 100;
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this.setValue(val);
  }
  get decimalSeparator() {
    return this._decimalSeparator;
  }
  set decimalSeparator(separator) {
    this.setDecimalSeparator(separator);
  }
  onChange(callback) {
    if (this._element) {
      this._element.addEventListener("stepper-change", callback);
    }
  }
  destroy() {
    this._stopHold();
    document.removeEventListener("mouseup", this._stopHold);
    if (super.destroy) {
      super.destroy();
    }
  }
};
HtmlSvgEdu.Dropdown = class Dropdown extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Dropdown-Menü mit Auswahloptionen",
      en: "Dropdown menu with selection options",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example:
      'let myDropdown = new Dropdown(["Option 1", "Option 2", "Option 3"], 0, 150);',
    constructor: {
      options: {
        name: "options",
        info: {
          en: "List of selectable options",
          de: "Liste der auswählbaren Optionen",
        },
      },
      selectedIndex: {
        name: "selectedIndex",
        info: {
          en: "Index of the currently selected option",
          de: "Index der aktuell ausgewählten Option",
        },
      },
      width: {
        name: "width",
        info: {
          en: "Width of the element in pixels",
          de: "Breite des Elements in Pixeln",
        },
      },
      font: {
        name: "font",
        info: {
          en: "Font family of the text",
          de: "Schriftart des Textes",
        },
      },
      fontSize: {
        name: "fontSize",
        info: {
          en: "Font size in pixels",
          de: "Schriftgröße in Pixeln",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {},
  };
  constructor(options, selectedIndex, width, font, fontSize) {
    super();
    this._options = options || [];
    this._selectedIndex = selectedIndex || 0;
    this._width = width || 150;
    this._font = font || "Arial";
    this._fontSize = fontSize || 16;
    this._isOpen = false;
    this._select = this._createElement("select");
    this._select.className = "pixi-html-ui pixi-dropdown-enhanced";
    this._element = this._select;
    this._applyEnhancedStyles();
    this._populateOptions();
    this._applyStyles();
    this._setupEvents();
  }
  _applyEnhancedStyles() {
    if (!document.getElementById("pixi-dropdown-enhanced-styles")) {
      const style = document.createElement("style");
      style.id = "pixi-dropdown-enhanced-styles";
      style.textContent =
        ".pixi-dropdown-enhanced {" +
        "-webkit-appearance: none;" +
        "-moz-appearance: none;" +
        "appearance: none;" +
        "padding: 10px 32px 10px 12px;" +
        "border: 2px solid #ddd;" +
        "border-radius: 4px;" +
        "background-color: white;" +
        "background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\");" +
        "background-position: right 8px center;" +
        "background-repeat: no-repeat;" +
        "background-size: 16px;" +
        "cursor: pointer;" +
        "box-sizing: border-box;" +
        "outline: none;" +
        "transition: all 0.2s ease;" +
        "min-height: 20px;" +
        "line-height: 1.2;" +
        "height: auto;" +
        "}" +
        ".pixi-dropdown-enhanced:hover {" +
        "border-color: #999;" +
        "}" +
        ".pixi-dropdown-enhanced:focus {" +
        "border-color: #007bff;" +
        "box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);" +
        "}" +
        "@-moz-document url-prefix() {" +
        ".pixi-dropdown-enhanced {" +
        "background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\");" +
        "padding: 10px 32px 10px 12px;" +
        "min-height: 40px;" +
        "}" +
        "}" +
        ".pixi-dropdown-enhanced::-ms-expand {" +
        "display: none;" +
        "}" +
        ".pixi-dropdown-enhanced::-webkit-appearance {" +
        "-webkit-appearance: none;" +
        "}" +
        ".pixi-dropdown-enhanced option {" +
        "padding: 10px 12px;" +
        "background-color: white;" +
        "color: black;" +
        "line-height: 1.2;" +
        "height: auto;" +
        "min-height: auto;" +
        "width: 100%;" +
        "box-sizing: border-box;" +
        "}" +
        ".pixi-dropdown-enhanced option:checked {" +
        "background-color: #007bff;" +
        "color: white;" +
        "}" +
        ".pixi-dropdown-enhanced option:hover {" +
        "background-color: #f8f9fa;" +
        "}" +
        "@media screen and (-webkit-min-device-pixel-ratio:0) {" +
        ".pixi-dropdown-enhanced option {" +
        "width: 100%;" +
        "min-width: 100%;" +
        "font-size: inherit !important;" +
        "}" +
        "}" +
        "@-moz-document url-prefix() {" +
        ".pixi-dropdown-enhanced option {" +
        "width: 100%;" +
        "min-width: 100%;" +
        "font-size: inherit !important;" +
        "}" +
        "}" +
        ".pixi-dropdown-enhanced option {" +
        "font-size: 50% !important;" +
        "}";
      document.head.appendChild(style);
    }
  }
  _populateOptions() {
    if (!this._select) return;
    while (this._select.firstChild) {
      this._select.removeChild(this._select.firstChild);
    }
    this._options.forEach((optText, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = optText;
      this._select.appendChild(option);
    });
    this._select.selectedIndex = this._selectedIndex;
    this._applyOptionStyles();
  }
  _applyStyles() {
    if (!this._select) return;
    this._select.style.width = this._width + "px";
    this._select.style.fontFamily = this._font;
    this._select.style.fontSize = this._fontSize + "px";
    const calculatedHeight = this._fontSize + 20;
    this._select.style.minHeight = Math.max(40, calculatedHeight) + "px";
    this._select.style.height = "auto";
    this._select.style.lineHeight = "1.2";
    this._applyOptionStyles();
  }
  _applyOptionStyles() {
    if (!this._select) return;
    const optionFontSize = this._fontSize / 1.7;
    const options = this._select.getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
      options[i].style.fontFamily = this._font;
      options[i].style.fontSize = optionFontSize + "px !important";
      options[i].style.lineHeight = "1.2";
      options[i].style.minHeight = this._fontSize + 4 + "px";
      options[i].style.width = "100%";
      options[i].style.minWidth = this._width + "px";
      options[i].style.boxSizing = "border-box";
      options[i].setAttribute(
        "style",
        options[i].getAttribute("style") +
          "; font-size: " +
          optionFontSize +
          "px !important;",
      );
    }
  }
  _setupEvents() {
    if (!this._select) return;
    this._select.addEventListener("change", (e) => {
      this._selectedIndex = this._select.selectedIndex;
      const event = new CustomEvent("dropdown-change", {
        detail: {
          component: this,
          selectedIndex: this._selectedIndex,
          selectedValue: this._options[this._selectedIndex],
        },
      });
      this._element.dispatchEvent(event);
    });
    this._select.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
          break;
        case "Escape":
          this._select.blur();
          break;
      }
    });
  }
  setOptions(options) {
    this._options = options || [];
    this._populateOptions();
    if (this._selectedIndex >= this._options.length) {
      this._selectedIndex = this._options.length > 0 ? 0 : -1;
      this._select.selectedIndex = this._selectedIndex;
    }
  }
  setSelectedIndex(index) {
    if (index >= 0 && index < this._options.length) {
      this._selectedIndex = index;
      if (this._select) {
        this._select.selectedIndex = index;
      }
    }
  }
  setFont(font) {
    this._font = font || "Arial";
    this._applyStyles();
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize || 16;
    this._applyStyles();
  }
  setWidth(width) {
    this._width = width || 150;
    if (this._select) {
      this._select.style.width = this._width + "px";
    }
  }
  focus() {
    if (this._select) {
      this._select.focus();
    }
  }
  get selectedIndex() {
    return this._selectedIndex;
  }
  get selectedValue() {
    return this._selectedIndex >= 0 ? this._options[this._selectedIndex] : null;
  }
  get options() {
    return [...this._options];
  }
  onChange(callback) {
    if (this._element && typeof callback === "function") {
      this._element.addEventListener("dropdown-change", callback);
    }
  }
  removeChangeListener(callback) {
    if (this._element && typeof callback === "function") {
      this._element.removeEventListener("dropdown-change", callback);
    }
  }
};
HtmlSvgEdu.ButtonSlider = class ButtonSlider extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Schieberegler mit ziehbarer Schaltfläche",
      en: "Slider with draggable button",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example: "let mySlider = new ButtonSlider(0, 100, 50, 1, 20, 200);",
    constructor: {
      min: {
        name: "min",
        info: {
          en: "Minimum value of the element",
          de: "Minimaler Wert des Elements",
        },
      },
      max: {
        name: "max",
        info: {
          en: "Maximum value of the element",
          de: "Maximaler Wert des Elements",
        },
      },
      value: {
        name: "value",
        info: {
          en: "Current value of the element",
          de: "Aktueller Wert des Elements",
        },
      },
      step: {
        name: "step",
        info: {
          en: "Step size of the element",
          de: "Schrittgröße des Elements",
        },
      },
      height: {
        name: "height",
        info: {
          en: "Height of the button in pixels",
          de: "Höhe des Buttons in Pixeln",
        },
      },
      trackLength: {
        name: "trackLength",
        info: {
          en: "Length of the slider track in pixels",
          de: "Länge des Schieberegler-Tracks in Pixeln",
        },
      },
      thumbShape: {
        name: "thumbShape",
        info: {
          en: 'Shape of the thumb: "rectangle", "circle", "triangle-A", "triangle-B"',
          de: 'Form des Knopfs: "rectangle", "circle", "triangle-A", "triangle-B"',
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      value: {
        name: "value",
        info: {
          en: "Sets the current value",
          de: "Setzt den aktuellen Wert",
        },
        example: "value = 30",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {
      setValue: {
        info: {
          en: "Sets the current value",
          de: "Setzt den aktuellen Wert",
        },
        example: "setValue(25)",
      },
      enableValueDisplay: {
        info: {
          en: "Enables the value display",
          de: "Aktiviert die Wertanzeige",
        },
        example: "enableValueDisplay()",
      },
      setValueDisplayFont: {
        info: {
          en: "Sets font family and size for the value display",
          de: "Setzt Schriftart und -größe für die Wertanzeige",
        },
        example: 'setValueDisplayFont("Arial", 16)',
      },
      setThumbShape: {
        info: {
          en: 'Sets the shape of the thumb ("rectangle", "circle", "triangle-A", "triangle-B")',
          de: 'Setzt die Form des Knopfs ("rectangle", "circle", "triangle-A", "triangle-B")',
        },
        example: 'setThumbShape("triangle-A")',
      },
      enableSnap: {
        info: {
          en: "Enables snapping to specific values",
          de: "Aktiviert das Einrasten an bestimmten Werten",
        },
        example: "enableSnap([10, 20, 30])",
      },
      setDisplayCommaType: {
        info: {
          en: 'Sets the type of decimal separator ("dot" for point, "comma" for comma)',
          de: 'Setzt die Art des Dezimalzeichens ("dot" für Punkt, "comma" für Komma)',
        },
        example: 'setDisplayCommaType("comma")',
      },
      setRangeMarker: {
        info: {
          en: "Sets a semi-transparent green range marker on the track",
          de: "Setzt einen halbtransparenten grünen Wertebereich-Marker auf dem Track",
        },
        example: "setRangeMarker(20, 60) // Markiert Bereich von 20 bis 60",
      },
      setVertical: {
        info: {
          en: "Sets the slider to vertical orientation",
          de: "Setzt den Schieberegler auf vertikale Ausrichtung",
        },
        example: "setVertical()",
      },

      onChange: {
        info: {
          en: "Adds a listener for value changes",
          de: "Fügt einen Listener für Wertänderungen hinzu",
        },
        example:
          "onChange(handleChange);\n\nfunction handleChange(e) { console.log(e.value); }",
      },
    },
  };
  constructor(min, max, value, step, height, trackLength, thumbShape) {
    super();
    this._value = value !== undefined ? value : 50;
    this._min = min !== undefined ? min : 0;
    this._max = max !== undefined ? max : 100;
    this._step = step !== undefined ? step : 1;
    this._height = height || 20;
    this._width = this._height / 2;
    this._trackLength = trackLength || 200;
    this._showValue = false;
    this._font = "Arial";
    this._fontSize = 16;
    this._displayCommaType = "dot";
    this._snapValues = null;
    this._snapEnabled = false;
    this._thumbShape = thumbShape || "rectangle";
    this._valueDisplay = null;
    this._isVertical = false;
    this._rangeMarkerStart = null;
    this._rangeMarkerEnd = null;
    this._rangeMarkerVisible = false;
    this._rangeMarker = null;
    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-svg-slider-container";
    this._createSVGElements();
    this._element = this._container;
    this._applyStyles();
    this._setupEvents();
    this._updateThumbPosition();
  }
  _createSVGElements() {
    let svgWidth, svgHeight;
    if (this._isVertical) {
      svgWidth = this._height + 10;
      svgHeight = this._trackLength + this._width;
    } else {
      svgWidth = this._trackLength + this._width;
      svgHeight = this._height + 10;
    }
    this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._svg.setAttribute("width", svgWidth);
    this._svg.setAttribute("height", svgHeight);
    this._svg.setAttribute("viewBox", "0 0 " + svgWidth + " " + svgHeight);
    this._svg.style.overflow = "visible";
    this._track = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    if (this._isVertical) {
      const offset = (this._height - this._width) / 2;
      this._track.setAttribute("x1", svgWidth / 2);
      this._track.setAttribute("y1", this._width / 2 + offset);
      this._track.setAttribute("x2", svgWidth / 2);
      this._track.setAttribute(
        "y2",
        this._trackLength + this._width / 2 + offset,
      );
    } else {
      this._track.setAttribute("x1", this._width / 2);
      this._track.setAttribute("y1", svgHeight / 2);
      this._track.setAttribute("x2", this._trackLength + this._width / 2);
      this._track.setAttribute("y2", svgHeight / 2);
    }
    this._track.setAttribute("stroke", "#555555");
    this._track.setAttribute("stroke-width", "1");
    this._rangeMarker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    this._rangeMarker.setAttribute("fill", "rgba(34, 139, 34, 0.4)");
    this._rangeMarker.setAttribute("stroke", "rgba(34, 139, 34, 0.8)");
    this._rangeMarker.setAttribute("stroke-width", "0.5");
    this._rangeMarker.setAttribute("rx", "2");
    this._rangeMarker.setAttribute("ry", "2");
    this._rangeMarker.style.display = "none";
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient",
    );
    gradient.setAttribute("id", "sliderGradient" + Math.random());
    if (this._isVertical) {
      gradient.setAttribute("x1", "0%");
      gradient.setAttribute("y1", "0%");
      gradient.setAttribute("x2", "100%");
      gradient.setAttribute("y2", "0%");
    } else {
      gradient.setAttribute("x1", "0%");
      gradient.setAttribute("y1", "0%");
      gradient.setAttribute("x2", "0%");
      gradient.setAttribute("y2", "100%");
    }
    const stop1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop",
    );
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "rgba(250, 250, 250, 0.5)");
    const stop2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop",
    );
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "rgba(204, 204, 204, 0.3)");
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    this._gradientId = gradient.getAttribute("id");
    this._hitArea = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    this._hitArea.setAttribute("width", svgWidth);
    this._hitArea.setAttribute("height", svgHeight);
    this._hitArea.setAttribute("fill", "transparent");
    this._hitArea.style.cursor = "pointer";
    this._svg.appendChild(defs);
    this._svg.appendChild(this._hitArea);
    this._svg.appendChild(this._rangeMarker);
    this._svg.appendChild(this._track);
    this._thumbGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    this._createThumb();
    this._svg.appendChild(this._thumbGroup);
    this._container.appendChild(this._svg);
  }
  _createThumb() {
    while (this._thumbGroup.firstChild) {
      this._thumbGroup.removeChild(this._thumbGroup.firstChild);
    }
    this._thumbInnerGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    switch (this._thumbShape) {
      case "circle":
        this._createCircleThumb();
        break;
      case "triangle-A":
        this._createTriangleUpThumb();
        break;
      case "triangle-B":
        this._createTriangleDownThumb();
        break;
      case "rectangle":
      default:
        this._createRectangleThumb();
        break;
    }
    if (this._isVertical) {
      const centerX = this._width / 2;
      const centerY = this._height / 2;
      this._thumbInnerGroup.setAttribute(
        "transform",
        "rotate(90 " + centerX + " " + centerY + ")",
      );
    }
    this._thumbGroup.appendChild(this._thumbInnerGroup);
    this._thumbGroup.style.cursor = "pointer";
  }
  _createRectangleThumb() {
    this._thumb = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    this._thumb.setAttribute("width", this._width);
    this._thumb.setAttribute("height", this._height);
    this._thumb.setAttribute("rx", "2");
    this._thumb.setAttribute("ry", "2");
    this._thumb.setAttribute("fill", "url(#" + this._gradientId + ")");
    this._thumb.setAttribute("stroke", "#999999");
    this._thumb.setAttribute("stroke-width", "0.5");
    this._thumbLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    this._thumbLine.setAttribute("x1", this._width / 2);
    this._thumbLine.setAttribute("y1", 0);
    this._thumbLine.setAttribute("x2", this._width / 2);
    this._thumbLine.setAttribute("y2", this._height);
    this._thumbLine.setAttribute("stroke", "rgba(20, 20, 20, 0.9)");
    this._thumbLine.setAttribute("stroke-width", "1");
    this._thumbInnerGroup.appendChild(this._thumb);
    this._thumbInnerGroup.appendChild(this._thumbLine);
  }
  _createCircleThumb() {
    const radius = Math.min(this._width, this._height) / 2;
    this._thumb = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    this._thumb.setAttribute("cx", this._width / 2);
    this._thumb.setAttribute("cy", this._height / 2);
    this._thumb.setAttribute("r", radius);
    this._thumb.setAttribute("fill", "url(#" + this._gradientId + ")");
    this._thumb.setAttribute("stroke", "#999999");
    this._thumb.setAttribute("stroke-width", "0.5");
    this._thumbLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    this._thumbLine.setAttribute("cx", this._width / 2);
    this._thumbLine.setAttribute("cy", this._height / 2);
    this._thumbLine.setAttribute("r", "2");
    this._thumbLine.setAttribute("fill", "rgba(20, 20, 20, 0.9)");
    this._thumbInnerGroup.appendChild(this._thumb);
    this._thumbInnerGroup.appendChild(this._thumbLine);
  }
  _createTriangleDownThumb() {
    const centerX = this._width / 2;
    const topY = 0;
    const bottomY = this._height / 2;
    const leftX = 0;
    const rightX = this._width;
    const points =
      leftX +
      "," +
      topY +
      " " +
      rightX +
      "," +
      topY +
      " " +
      centerX +
      "," +
      bottomY;
    this._thumb = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    this._thumb.setAttribute("points", points);
    this._thumb.setAttribute("fill", "url(#" + this._gradientId + ")");
    this._thumb.setAttribute("stroke", "#999999");
    this._thumb.setAttribute("stroke-width", "0.5");
    this._thumbLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    this._thumbLine.setAttribute("x1", centerX);
    this._thumbLine.setAttribute("y1", topY + 1);
    this._thumbLine.setAttribute("x2", centerX);
    this._thumbLine.setAttribute("y2", bottomY - 1);
    this._thumbLine.setAttribute("stroke", "rgba(20, 20, 20, 0.9)");
    this._thumbLine.setAttribute("stroke-width", "1");
    this._thumbInnerGroup.appendChild(this._thumb);
    this._thumbInnerGroup.appendChild(this._thumbLine);
  }
  _createTriangleUpThumb() {
    const centerX = this._width / 2;
    const topY = this._height / 2;
    const bottomY = this._height;
    const leftX = 0;
    const rightX = this._width;
    const points =
      centerX +
      "," +
      topY +
      " " +
      leftX +
      "," +
      bottomY +
      " " +
      rightX +
      "," +
      bottomY;
    this._thumb = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    this._thumb.setAttribute("points", points);
    this._thumb.setAttribute("fill", "url(#" + this._gradientId + ")");
    this._thumb.setAttribute("stroke", "#999999");
    this._thumb.setAttribute("stroke-width", "0.5");
    this._thumbLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    this._thumbLine.setAttribute("x1", centerX);
    this._thumbLine.setAttribute("y1", topY + 1);
    this._thumbLine.setAttribute("x2", centerX);
    this._thumbLine.setAttribute("y2", bottomY - 1);
    this._thumbLine.setAttribute("stroke", "rgba(20, 20, 20, 0.9)");
    this._thumbLine.setAttribute("stroke-width", "1");
    this._thumbInnerGroup.appendChild(this._thumb);
    this._thumbInnerGroup.appendChild(this._thumbLine);
  }
  _formatDisplayValue(value) {
    // Runde den Wert basierend auf der stepSize
    let roundedValue = Math.round(value / this._step) * this._step;

    // Bestimme die Anzahl der Dezimalstellen basierend auf der stepSize
    let decimalPlaces = 0;
    if (this._step < 1) {
      // Berechne die benötigten Dezimalstellen
      decimalPlaces = Math.max(0, -Math.floor(Math.log10(this._step)));
    }

    // Formatiere den Wert mit der korrekten Anzahl von Dezimalstellen
    let displayString = roundedValue.toFixed(decimalPlaces);

    // Wende den Dezimalzeichen-Typ an
    if (this._displayCommaType === "comma") {
      displayString = displayString.replace(".", ",");
    }

    return displayString;
  }
  _updateRangeMarker() {
    if (!this._rangeMarker || !this._rangeMarkerVisible) return;
    if (this._isVertical) {
      const svgWidth = this._svg.getAttribute("width");
      const trackX = svgWidth / 2;
      const markerWidth = 20;
      const markerX = trackX - markerWidth / 2;
      const offset = (this._height - this._width) / 2;
      const startPercentage =
        1 - (this._rangeMarkerEnd - this._min) / (this._max - this._min);
      const endPercentage =
        1 - (this._rangeMarkerStart - this._min) / (this._max - this._min);
      const startY =
        this._width / 2 + offset + startPercentage * this._trackLength;
      const endY = this._width / 2 + offset + endPercentage * this._trackLength;
      const height = endY - startY;
      this._rangeMarker.setAttribute("x", markerX);
      this._rangeMarker.setAttribute("y", startY);
      this._rangeMarker.setAttribute("width", markerWidth);
      this._rangeMarker.setAttribute("height", height);
    } else {
      const svgHeight = this._svg.getAttribute("height");
      const trackY = svgHeight / 2;
      const markerHeight = 20;
      const markerY = trackY - markerHeight / 2;
      const startPercentage =
        (this._rangeMarkerStart - this._min) / (this._max - this._min);
      const endPercentage =
        (this._rangeMarkerEnd - this._min) / (this._max - this._min);
      const startX = this._width / 2 + startPercentage * this._trackLength;
      const endX = this._width / 2 + endPercentage * this._trackLength;
      const width = endX - startX;
      this._rangeMarker.setAttribute("x", startX);
      this._rangeMarker.setAttribute("y", markerY);
      this._rangeMarker.setAttribute("width", width);
      this._rangeMarker.setAttribute("height", markerHeight);
    }
  }
  _applyStyles() {
    if (!this._element) return;
    this._container.style.display = "flex";
    this._container.style.alignItems = "center";
    this._container.style.backgroundColor = "transparent";
    this._container.style.padding = "5px";
    this._container.style.borderRadius = "4px";
    if (this._isVertical) {
      this._container.style.flexDirection = "column";
    } else {
      this._container.style.flexDirection = "row";
    }
    if (this._valueDisplay) {
      this._valueDisplay.style.fontFamily = this._font;
      this._valueDisplay.style.fontSize = this._fontSize + "px";
      if (this._isVertical) {
        this._valueDisplay.style.marginLeft = "0";
        this._valueDisplay.style.marginTop = "10px";
      } else {
        this._valueDisplay.style.marginLeft = "10px";
        this._valueDisplay.style.marginTop = "0";
      }
      this._valueDisplay.style.minWidth = "40px";
      this._valueDisplay.style.textAlign = "center";
      this._valueDisplay.textContent = this._formatDisplayValue(this._value);
    }
    if (this._track) {
      if (this._isVertical) {
        const svgWidth = this._svg.getAttribute("width");
        const offset = (this._height - this._width) / 2;
        this._track.setAttribute("x1", svgWidth / 2);
        this._track.setAttribute("y1", this._width / 2 + offset);
        this._track.setAttribute("x2", svgWidth / 2);
        this._track.setAttribute(
          "y2",
          this._trackLength + this._width / 2 + offset,
        );
      } else {
        const svgHeight = this._svg.getAttribute("height");
        this._track.setAttribute("x1", this._width / 2);
        this._track.setAttribute("y1", svgHeight / 2);
        this._track.setAttribute("x2", this._trackLength + this._width / 2);
        this._track.setAttribute("y2", svgHeight / 2);
      }
    }
    if (this._svg) {
      let svgWidth, svgHeight;
      if (this._isVertical) {
        svgWidth = this._height + 10;
        svgHeight = this._trackLength + this._width;
      } else {
        svgWidth = this._trackLength + this._width;
        svgHeight = this._height + 10;
      }
      this._svg.setAttribute("width", svgWidth);
      this._svg.setAttribute("height", svgHeight);
      this._svg.setAttribute("viewBox", "0 0 " + svgWidth + " " + svgHeight);
    }
    if (this._hitArea) {
      if (this._isVertical) {
        this._hitArea.setAttribute("width", this._height + 10);
        this._hitArea.setAttribute("height", this._trackLength + this._width);
      } else {
        this._hitArea.setAttribute("width", this._trackLength + this._width);
        this._hitArea.setAttribute("height", this._height + 10);
      }
    }
    this._updateRangeMarker();
    this._updateThumbPosition();
  }
  _updateThumbPosition() {
    if (!this._thumbGroup) return;
    const percentage = (this._value - this._min) / (this._max - this._min);
    let posX, posY;
    if (this._isVertical) {
      const invertedPercentage = 1 - percentage;
      posY = invertedPercentage * this._trackLength;
      const svgWidth = this._svg.getAttribute("width");
      if (this._thumbShape === "triangle-B") {
        posX = svgWidth / 2 - this._width / 2;
      } else if (this._thumbShape === "triangle-A") {
        posX = svgWidth / 2 - this._width / 2;
      } else {
        posX = svgWidth / 2 - this._width / 2;
      }
    } else {
      posX = percentage * this._trackLength;
      if (this._thumbShape === "triangle-B") {
        const trackY = this._svg.getAttribute("height") / 2;
        posY = trackY - this._height / 2;
      } else if (this._thumbShape === "triangle-A") {
        const trackY = this._svg.getAttribute("height") / 2;
        posY = trackY - this._height / 2;
      } else {
        posY = this._svg.getAttribute("height") / 2 - this._height / 2;
      }
    }
    this._thumbGroup.setAttribute(
      "transform",
      "translate(" + posX + ", " + posY + ")",
    );
  }
  _setupEvents() {
    if (!this._svg) return;
    let isDragging = false;
    let dragOffset = 0;
    const setThumbStroke = (color) => {
      if (this._thumb) {
        this._thumb.setAttribute("stroke", color);
      }
    };
    const getValueFromPosition = (clientX, clientY) => {
      const svgRect = this._svg.getBoundingClientRect();
      const CTM = this._svg.getScreenCTM();
      if (!CTM) return this._value;
      const svgPoint = this._svg.createSVGPoint();
      svgPoint.x = clientX;
      svgPoint.y = clientY;
      const transformedPoint = svgPoint.matrixTransform(CTM.inverse());
      let percentage;
      if (this._isVertical) {
        let trackPosition = transformedPoint.y - dragOffset;
        percentage = (trackPosition - this._width / 2) / this._trackLength;
        percentage = 1 - percentage;
        percentage = Math.max(0, Math.min(1, percentage));
      } else {
        let trackPosition = transformedPoint.x - dragOffset;
        percentage = (trackPosition - this._width / 2) / this._trackLength;
        percentage = Math.max(0, Math.min(1, percentage));
      }
      const rawValue = this._min + percentage * (this._max - this._min);
      const steppedValue = Math.round(rawValue / this._step) * this._step;
      return Math.max(this._min, Math.min(this._max, steppedValue));
    };
    const updateValue = (clientX, clientY) => {
      let newValue = getValueFromPosition(clientX, clientY);
      if (
        this._snapEnabled &&
        this._snapValues &&
        this._snapValues.length > 0
      ) {
        const CTM = this._svg.getScreenCTM();
        if (CTM) {
          const svgPoint = this._svg.createSVGPoint();
          svgPoint.x = clientX;
          svgPoint.y = clientY;
          const transformedPoint = svgPoint.matrixTransform(CTM.inverse());
          const pixelThreshold = 4 * (CTM.a !== 0 ? 1 / CTM.a : 1);
          let closestSnapValue = null;
          let minDistance = Infinity;
          for (const snapValue of this._snapValues) {
            if (snapValue >= this._min && snapValue <= this._max) {
              const snapPercentage =
                (snapValue - this._min) / (this._max - this._min);
              let snapPosition;
              if (this._isVertical) {
                const invertedPercentage = 1 - snapPercentage;
                snapPosition =
                  invertedPercentage * this._trackLength + this._width / 2;
                const distance = Math.abs(transformedPoint.y - snapPosition);
                if (distance < pixelThreshold && distance < minDistance) {
                  minDistance = distance;
                  closestSnapValue = snapValue;
                }
              } else {
                snapPosition =
                  snapPercentage * this._trackLength + this._width / 2;
                const distance = Math.abs(transformedPoint.x - snapPosition);
                if (distance < pixelThreshold && distance < minDistance) {
                  minDistance = distance;
                  closestSnapValue = snapValue;
                }
              }
            }
          }
          if (closestSnapValue !== null) {
            newValue = closestSnapValue;
          }
        }
      }
      if (newValue !== this._value) {
        this.setValue(newValue);
        const event = new CustomEvent("slider-change", {
          detail: { component: this, value: this._value },
        });
        event.value = this._value;
        this._element.dispatchEvent(event);
      }
    };
    const onMouseDown = (e) => {
      isDragging = true;
      const CTM = this._svg.getScreenCTM();
      if (!CTM) return;
      const svgPoint = this._svg.createSVGPoint();
      const mousePoint = this._svg.createSVGPoint();
      mousePoint.x = e.clientX;
      mousePoint.y = e.clientY;
      const transformedMousePoint = mousePoint.matrixTransform(CTM.inverse());
      if (this._isVertical) {
        const percentage = (this._value - this._min) / (this._max - this._min);
        const invertedPercentage = 1 - percentage;
        const thumbCenterInSVG =
          invertedPercentage * this._trackLength + this._width / 2;
        dragOffset = transformedMousePoint.y - thumbCenterInSVG;
      } else {
        const percentage = (this._value - this._min) / (this._max - this._min);
        const thumbCenterInSVG =
          percentage * this._trackLength + this._width / 2;
        dragOffset = transformedMousePoint.x - thumbCenterInSVG;
      }
      document.body.style.userSelect = "none";
      setThumbStroke("#228B22");
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      e.preventDefault();
    };
    const onMouseMove = (e) => {
      if (isDragging) {
        updateValue(e.clientX, e.clientY);
        e.preventDefault();
      }
    };
    const onMouseUp = (e) => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = "";
        setThumbStroke("#999999");
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (
          this._snapEnabled &&
          this._snapValues &&
          this._snapValues.length > 0
        ) {
          updateValue(e.clientX, e.clientY);
        }
      }
    };
    const onMouseOver = () => {
      setThumbStroke("#228B22");
    };
    const onMouseOut = () => {
      if (!isDragging) {
        setThumbStroke("#999999");
      }
    };
    const onTrackClick = (e) => {
      if (!isDragging) {
        dragOffset = 0;
        updateValue(e.clientX, e.clientY);
        isDragging = true;
        const CTM = this._svg.getScreenCTM();
        if (CTM) {
          const mousePoint = this._svg.createSVGPoint();
          mousePoint.x = e.clientX;
          mousePoint.y = e.clientY;
          const transformedMousePoint = mousePoint.matrixTransform(
            CTM.inverse(),
          );
          if (this._isVertical) {
            const percentage =
              (this._value - this._min) / (this._max - this._min);
            const invertedPercentage = 1 - percentage;
            const thumbCenterInSVG =
              invertedPercentage * this._trackLength + this._width / 2;
            dragOffset = transformedMousePoint.y - thumbCenterInSVG;
          } else {
            const percentage =
              (this._value - this._min) / (this._max - this._min);
            const thumbCenterInSVG =
              percentage * this._trackLength + this._width / 2;
            dragOffset = transformedMousePoint.x - thumbCenterInSVG;
          }
        }
        document.body.style.userSelect = "none";
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        setThumbStroke("#228B22");
      }
    };
    this._thumbGroup.addEventListener("mousedown", onMouseDown);
    this._thumbGroup.addEventListener("mouseover", onMouseOver);
    this._thumbGroup.addEventListener("mouseout", onMouseOut);
    this._hitArea.addEventListener("mousedown", onTrackClick);
    this._thumbGroup.addEventListener("touchstart", (e) => {
      isDragging = true;
      const CTM = this._svg.getScreenCTM();
      if (!CTM) return;
      const touchPoint = this._svg.createSVGPoint();
      touchPoint.x = e.touches[0].clientX;
      touchPoint.y = e.touches[0].clientY;
      const transformedTouchPoint = touchPoint.matrixTransform(CTM.inverse());
      if (this._isVertical) {
        const percentage = (this._value - this._min) / (this._max - this._min);
        const invertedPercentage = 1 - percentage;
        const thumbCenterInSVG =
          invertedPercentage * this._trackLength + this._width / 2;
        dragOffset = transformedTouchPoint.y - thumbCenterInSVG;
      } else {
        const percentage = (this._value - this._min) / (this._max - this._min);
        const thumbCenterInSVG =
          percentage * this._trackLength + this._width / 2;
        dragOffset = transformedTouchPoint.x - thumbCenterInSVG;
      }
      setThumbStroke("#228B22");
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
      e.preventDefault();
    });
    const onTouchMove = (e) => {
      if (isDragging) {
        updateValue(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
      }
    };
    const onTouchEnd = (e) => {
      if (isDragging) {
        isDragging = false;
        setThumbStroke("#999999");
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        if (
          this._snapEnabled &&
          this._snapValues &&
          this._snapValues.length > 0
        ) {
          if (e.changedTouches && e.changedTouches.length > 0) {
            updateValue(
              e.changedTouches[0].clientX,
              e.changedTouches[0].clientY,
            );
          }
        }
      }
    };
    this._hitArea.addEventListener("touchstart", (e) => {
      if (!isDragging) {
        dragOffset = 0;
        updateValue(e.touches[0].clientX, e.touches[0].clientY);
        const CTM = this._svg.getScreenCTM();
        if (CTM) {
          const touchPoint = this._svg.createSVGPoint();
          touchPoint.x = e.touches[0].clientX;
          touchPoint.y = e.touches[0].clientY;
          const transformedTouchPoint = touchPoint.matrixTransform(
            CTM.inverse(),
          );
          if (this._isVertical) {
            const percentage =
              (this._value - this._min) / (this._max - this._min);
            const invertedPercentage = 1 - percentage;
            const thumbCenterInSVG =
              invertedPercentage * this._trackLength + this._width / 2;
            dragOffset = transformedTouchPoint.y - thumbCenterInSVG;
          } else {
            const percentage =
              (this._value - this._min) / (this._max - this._min);
            const thumbCenterInSVG =
              percentage * this._trackLength + this._width / 2;
            dragOffset = transformedTouchPoint.x - thumbCenterInSVG;
          }
        }
        isDragging = true;
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
        setThumbStroke("#228B22");
        e.preventDefault();
      }
    });
  }
  setValue(value) {
    value = Number(value);
    value = Math.max(this._min, Math.min(this._max, value));
    value =
      Math.round((value - this._min) / this._step) * this._step + this._min;
    if (this._value !== value) {
      this._value = value;
      if (this._valueDisplay) {
        this._valueDisplay.textContent = this._formatDisplayValue(this._value);
      }
      this._updateThumbPosition();
    }
  }
  setMin(min) {
    this._min = Number(min);
    if (this._value < this._min) {
      this.setValue(this._min);
    }
    this._updateRangeMarker();
    this._updateThumbPosition();
  }
  setMax(max) {
    this._max = Number(max);
    if (this._value > this._max) {
      this.setValue(this._max);
    }
    this._updateRangeMarker();
    this._updateThumbPosition();
  }
  setStep(step) {
    this._step = Number(step);
    this.setValue(this._value);
    // Aktualisiere die Anzeige mit der neuen Formatierung
    if (this._valueDisplay) {
      this._valueDisplay.textContent = this._formatDisplayValue(this._value);
    }
  }
  setHeight(height) {
    this._height = Number(height);
    this._width = this._height / 2;
    this._createThumb();
    this._applyStyles();
    this._setupEvents();
  }
  setTrackLength(length) {
    this._trackLength = Number(length);
    this._applyStyles();
  }
  enableValueDisplay() {
    this._showValue = true;
    if (!this._valueDisplay) {
      this._valueDisplay = document.createElement("span");
      this._valueDisplay.className = "pixi-slider-value";
      this._container.appendChild(this._valueDisplay);
    }
    this._applyStyles();
  }
  setValueDisplayFont(font = "Arial", fontSize = 16) {
    this._font = font;
    this._fontSize = fontSize;
    if (this._valueDisplay) {
      this._applyStyles();
    }
  }
  setDisplayCommaType(commaType) {
    this._displayCommaType = commaType === "comma" ? "comma" : "dot";
    if (this._valueDisplay) {
      this._valueDisplay.textContent = this._formatDisplayValue(this._value);
    }
  }
  setThumbShape(shape) {
    const validShapes = ["rectangle", "circle", "triangle-A", "triangle-B"];
    if (validShapes.includes(shape)) {
      this._thumbShape = shape;
      this._createThumb();
      this._setupEvents();
      this._updateThumbPosition();
    } else {
      console.warn(
        "Invalid thumb shape: " +
          shape +
          ". Valid shapes are: " +
          validShapes.join(", "),
      );
    }
  }
  setRangeMarker(startValue, endValue) {
    startValue = Math.max(this._min, Math.min(this._max, Number(startValue)));
    endValue = Math.max(this._min, Math.min(this._max, Number(endValue)));
    if (startValue > endValue) {
      [startValue, endValue] = [endValue, startValue];
    }
    this._rangeMarkerStart = startValue;
    this._rangeMarkerEnd = endValue;
    this._rangeMarkerVisible = true;
    if (this._rangeMarker) {
      this._rangeMarker.style.display = "block";
      this._updateRangeMarker();
    }
  }
  setVertical() {
    if (this._isVertical) return;
    this._isVertical = true;
    if (this._svg) {
      this._container.removeChild(this._svg);
    }
    this._createSVGElements();
    this._applyStyles();
    this._setupEvents();
    this._updateThumbPosition();
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this.setValue(val);
  }
  get thumbShape() {
    return this._thumbShape;
  }
  set thumbShape(shape) {
    this.setThumbShape(shape);
  }
  get displayCommaType() {
    return this._displayCommaType;
  }
  set displayCommaType(commaType) {
    this.setDisplayCommaType(commaType);
  }
  get rangeMarkerStart() {
    return this._rangeMarkerStart;
  }
  get rangeMarkerEnd() {
    return this._rangeMarkerEnd;
  }
  get rangeMarkerVisible() {
    return this._rangeMarkerVisible;
  }
  get isVertical() {
    return this._isVertical;
  }
  /**
   * Fügt einen Listener für Wertänderungen hinzu (besserer Name als addChangeListener)
   * @param {Function} callback - Callback-Funktion die bei Änderungen aufgerufen wird
   */
  onChange(callback) {
    if (this._element) {
      this._element.addEventListener("slider-change", callback);
    }
  }
  /**
   * Enables snap-to-values feature with the specified values
   * @param {Array} values - Array of values to snap to (must be between min and max)
   */
  enableSnap(values) {
    if (Array.isArray(values)) {
      this._snapValues = values.filter(
        (val) => val >= this._min && val <= this._max,
      );
      this._snapEnabled = true;
    }
  }
  static {
    if (!document.getElementById("svg-slider-styles")) {
      const styleElement = document.createElement("style");
      styleElement.id = "svg-slider-styles";
      styleElement.textContent =
        ".pixi-svg-slider-container {" +
        "background-color: transparent;" +
        "padding: 5px 10px;" +
        "border-radius: 4px;" +
        "display: flex;" +
        "align-items: center;" +
        "}" +
        ".pixi-slider-value {" +
        "margin-left: 10px;" +
        "min-width: 40px;" +
        "text-align: center;" +
        "font-family: Arial, sans-serif;" +
        "}";
      document.head.appendChild(styleElement);
    }
  }
};
HtmlSvgEdu.MathForm = class MathForm extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Mathematische Formel mit MathJax-Rendering",
      en: "Mathematical formula with MathJax rendering",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example: 'let myFormula = new MathForm("x^2 + y^2 = r^2");',
    constructor: {
      formula: {
        name: "formula",
        info: {
          en: "Mathematical formula as LaTeX string or MathJax-formatted string",
          de: "Mathematische Formel als LaTeX-String oder MathJax-formatierter String",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {
      setScale: {
        name: "setScale",
        info: {
          en: "Sets the scaling factor of the formula",
          de: "Setzt den Skalierungsfaktor der Formel",
        },
        example: "setScale(1.5)",
      },
      setColor: {
        name: "setColor",
        info: {
          en: "Sets the color of the formula",
          de: "Setzt die Farbe der Formel",
        },
        example: 'setColor("#FF0000")',
      },
    },
  };
  constructor(formula) {
    super();
    this._width = "auto";
    this._height = "auto";
    this._scale = 1;
    this._color = "#000000"; // Standard-Farbe schwarz
    this._element = this._createElement("div");
    this._element.className = "pixi-html-ui pixi-math-form";
    this._formulaContainer = document.createElement("div");
    this._element.appendChild(this._formulaContainer);
    this._applyStyles();
    this.setFormula(formula);
  }
  _applyStyles() {
    if (!this._element) return;
    if (typeof this._width === "number") {
      this._element.style.width = this._width + "px";
    } else {
      this._element.style.width = this._width;
    }
    if (typeof this._height === "number") {
      this._element.style.height = this._height + "px";
    } else {
      this._element.style.height = this._height;
    }
    this._formulaContainer.style.transform = "scale(" + this._scale + ")";
    this._formulaContainer.style.transformOrigin = "left top";
    this._formulaContainer.style.color = this._color;
  }
  _determineFormatType(formula) {
    if (!formula) return { rawFormula: "", isBlock: false };
    if (formula.startsWith("$$") && formula.endsWith("$$")) {
      return {
        rawFormula: formula.substring(2, formula.length - 2),
        isBlock: true,
        format: "dollar",
      };
    }
    if (formula.startsWith("\\[") && formula.endsWith("\\]")) {
      return {
        rawFormula: formula.substring(2, formula.length - 2),
        isBlock: true,
        format: "bracket",
      };
    }
    if (
      formula.startsWith("$") &&
      formula.endsWith("$") &&
      !formula.startsWith("$$")
    ) {
      return {
        rawFormula: formula.substring(1, formula.length - 1),
        isBlock: false,
        format: "dollar",
      };
    }
    if (formula.startsWith("\\(") && formula.endsWith("\\)")) {
      return {
        rawFormula: formula.substring(2, formula.length - 2),
        isBlock: false,
        format: "bracket",
      };
    }
    return {
      rawFormula: formula,
      isBlock: false,
      format: "none",
    };
  }
  _renderFormula() {
    if (!this._formulaContainer || !this._formula) return;
    const { rawFormula, isBlock, format } = this._determineFormatType(
      this._formula,
    );
    if (isBlock) {
      this._formulaContainer.innerHTML = "\\[" + rawFormula + "\\]";
      this._formulaContainer.style.display = "block";
      this._formulaContainer.style.margin = "1em 0";
    } else {
      this._formulaContainer.innerHTML = "\\(" + rawFormula + "\\)";
      this._formulaContainer.style.display = "inline-block";
      this._formulaContainer.style.margin = "0";
    }
    this._processMathJax();
  }
  _processMathJax() {
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset([this._formulaContainer]);
    } else {
      this._waitForMathJax();
    }
  }
  _waitForMathJax() {
    const checkInterval = setInterval(() => {
      if (window.MathJax && window.MathJax.typeset) {
        clearInterval(checkInterval);
        window.MathJax.typeset([this._formulaContainer]);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(checkInterval);
      console.warn("MathJax wurde nicht innerhalb von 5 Sekunden geladen.");
    }, 5000);
  }
  setFormula(formula) {
    this._formula = formula;
    this._formula.replace(/(?<!\\)\\(?!\\)/g, "\\\\");
    this._renderFormula();
  }
  setScale(scale) {
    this._scale = scale;
    this._applyStyles();
  }
  setColor(color) {
    this._color = color;
    this._applyStyles();
  }
  setWidth(width) {
    this._width = width;
    this._applyStyles();
  }
  setHeight(height) {
    this._height = height;
    this._applyStyles();
  }
};
HtmlSvgEdu.ThreeJSCanvasSimple = class ThreeJSCanvasSimple extends (
  HtmlSvgEdu.Component
) {
  static serializationMap = {
    description: {
      de: "Three.js 3D-Canvas für 3D-Modelle",
      en: "Three.js 3D canvas for 3D models",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example:
      "let my3DCanvas = new ThreeJSCanvasSimple(null, 400, 300, 0xffffff, true, false);",
    constructor: {
      glbContent: {
        name: "glbContent",
        info: {
          en: "GLB model as URL or data:model/gltf-binary;base64,... string",
          de: "GLB-Modell als URL oder data:model/gltf-binary;base64,... String",
        },
      },
      width: {
        name: "width",
        info: {
          en: "Width of the canvas in pixels",
          de: "Breite der Leinwand in Pixeln",
        },
      },
      height: {
        name: "height",
        info: {
          en: "Height of the canvas in pixels",
          de: "Höhe der Leinwand in Pixeln",
        },
      },
      backgroundColor: {
        name: "backgroundColor",
        info: {
          en: "Background color of the scene (hex value like 0xffffff)",
          de: "Hintergrundfarbe der Szene (Hex-Wert wie 0xffffff)",
        },
      },
      enableShadows: {
        name: "enableShadows",
        info: {
          en: "Enable shadows in the scene (true/false)",
          de: "Schatten in der Szene aktivieren (true/false)",
        },
      },
      autoRotate: {
        name: "autoRotate",
        info: {
          en: "Auto-rotate the camera around the model (true/false)",
          de: "Kamera automatisch um das Modell rotieren (true/false)",
        },
      },
    },
  };
  constructor(
    glbContent = null,
    width = 400,
    height = 300,
    backgroundColor = 0xffffff,
    enableShadows = true,
    autoRotate = false,
  ) {
    super();
    this._glbContent = glbContent;
    this._width = width;
    this._height = height;
    this._backgroundColor = backgroundColor;
    this._enableShadows = enableShadows;
    this._autoRotate = autoRotate;
    this._isLibraryLoaded = false;
    this._loadingPromise = null;
    this._isReady = false;
    this._pendingOperations = [];
    this._objects = new Map();
    this._borderColor = null;
    this._borderWidth = 0;
    this._scene = null;
    this._camera = null;
    this._renderer = null;
    this._controls = null;
    this._gltfLoader = null;
    this._animationMixer = null;
    this._clock = null;
    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-threejs-container";
    this._element = this._container;
    if (Board.getInstance()) {
      Board.getInstance().addUIChild(this);
    }
    this._initializeThreeJS();
    this._applyStyles();
    return this._setupObjectProxy();
  }
  _setupObjectProxy() {
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target || typeof prop === "symbol") {
          return target[prop];
        }
        if (typeof prop === "string" && this._objects.has(prop)) {
          return this._objects.get(prop);
        }
        return undefined;
      },
    });
  }
  async _initializeThreeJS() {
    try {
      await this._loadThreeJSLibrary();
      this._createScene();
      this._isReady = true;
      this._executePendingOperations();
      if (this._glbContent) {
        await this._loadInitialModel();
      }
      console.log("ThreeJS Canvas (Simple) is ready");
    } catch (error) {
      console.error("Failed to initialize Three.js:", error);
    }
  }
  async _loadInitialModel() {
    try {
      console.log(
        "Loading initial model:",
        this._glbContent.substring(0, 50) + "...",
      );
      await this.loadGLB(this._glbContent);
    } catch (error) {
      console.error("Failed to load initial model:", error);
    }
  }
  _loadThreeJSLibrary() {
    if (this._loadingPromise) {
      return this._loadingPromise;
    }
    if (window.THREE && window.THREE.GLTFLoader) {
      this._isLibraryLoaded = true;
      return Promise.resolve();
    }
    this._loadingPromise = new Promise((resolve, reject) => {
      const loadScriptsSequentially = async () => {
        const scripts = [
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
          "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js",
          "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js",
        ];
        for (const src of scripts) {
          try {
            await this._loadScript(src);
          } catch (error) {
            throw error;
          }
        }
        this._isLibraryLoaded = true;
        console.log("Three.js core libraries loaded");
        resolve();
      };
      loadScriptsSequentially().catch(reject);
    });
    return this._loadingPromise;
  }
  _loadScript(src) {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src="' + src + '"]',
      );
      if (existingScript) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load script: " + src));
      document.head.appendChild(script);
    });
  }
  _createScene() {
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(this._backgroundColor);
    this._camera = new THREE.PerspectiveCamera(
      75,
      this._width / this._height,
      0.1,
      1000,
    );
    this._camera.position.set(5, 5, 5);
    this._camera.lookAt(0, 0, 0);
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this._renderer.setSize(this._width, this._height);
    this._renderer.shadowMap.enabled = this._enableShadows;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._container.appendChild(this._renderer.domElement);
    this._controls = new THREE.OrbitControls(
      this._camera,
      this._renderer.domElement,
    );
    this._controls.enableDamping = true;
    this._controls.dampingFactor = 0.05;
    this._controls.autoRotate = this._autoRotate;
    this._controls.autoRotateSpeed = 2.0;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this._scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = this._enableShadows;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this._scene.add(directionalLight);
    this._gltfLoader = new THREE.GLTFLoader();
    this._clock = new THREE.Clock();
    this._animate();
    this._applyBorderStyles();
  }
  _animate() {
    if (!this._isReady) return;
    requestAnimationFrame(() => this._animate());
    const delta = this._clock.getDelta();
    if (this._animationMixer) {
      this._animationMixer.update(delta);
    }
    this._controls.update();
    this._renderer.render(this._scene, this._camera);
  }
  async loadGLB(urlOrData) {
    return new Promise((resolve, reject) => {
      this._queueOperation(() => {
        this.clear();
        const onLoad = (gltf) => {
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 5 / maxDim;
          model.position.sub(center);
          model.scale.multiplyScalar(scale);
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          this._scene.add(model);
          this._objects.set("model", model);
          if (gltf.animations && gltf.animations.length > 0) {
            this._animationMixer = new THREE.AnimationMixer(model);
            const action = this._animationMixer.clipAction(gltf.animations[0]);
            action.play();
          }
          this._camera.position.set(8, 6, 8);
          this._camera.lookAt(0, 0, 0);
          this._controls.target.set(0, 0, 0);
          console.log("GLB model loaded successfully");
          resolve(model);
        };
        const onError = (error) => {
          console.error("Error loading GLB:", error);
          reject(error);
        };
        if (urlOrData.startsWith("data:")) {
          let base64Data;
          if (urlOrData.includes("base64,")) {
            base64Data = urlOrData.split("base64,")[1];
          } else {
            console.error("Invalid data URL format");
            reject(new Error("Invalid data URL format"));
            return;
          }
          const binary = atob(base64Data);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: "model/gltf-binary" });
          const objectUrl = URL.createObjectURL(blob);
          this._gltfLoader.load(
            objectUrl,
            (gltf) => {
              URL.revokeObjectURL(objectUrl);
              onLoad(gltf);
            },
            undefined,
            onError,
          );
        } else if (
          urlOrData.startsWith("http://") ||
          urlOrData.startsWith("https://") ||
          urlOrData.startsWith("/") ||
          urlOrData.includes(".glb") ||
          urlOrData.includes(".gltf")
        ) {
          this._gltfLoader.load(urlOrData, onLoad, undefined, onError);
        } else {
          const dataUrl = "data:model/gltf-binary;base64," + urlOrData;
          this.loadGLB(dataUrl).then(resolve).catch(reject);
        }
      });
    });
  }
  async loadGLBFromString(base64String) {
    const dataUrl = "data:model/gltf-binary;base64," + base64String;
    return this.loadGLB(dataUrl);
  }
  addPrimitive(type, params = {}, name = null) {
    this._queueOperation(() => {
      let geometry;
      switch (type.toLowerCase()) {
        case "box":
          geometry = new THREE.BoxGeometry(
            params.width || 1,
            params.height || 1,
            params.depth || 1,
          );
          break;
        case "sphere":
          geometry = new THREE.SphereGeometry(
            params.radius || 0.5,
            params.widthSegments || 32,
            params.heightSegments || 16,
          );
          break;
        case "cylinder":
          geometry = new THREE.CylinderGeometry(
            params.radiusTop || 0.5,
            params.radiusBottom || 0.5,
            params.height || 1,
            params.radialSegments || 32,
          );
          break;
        case "cone":
          geometry = new THREE.ConeGeometry(
            params.radius || 0.5,
            params.height || 1,
            params.radialSegments || 32,
          );
          break;
        case "torus":
          geometry = new THREE.TorusGeometry(
            params.radius || 1,
            params.tube || 0.4,
            params.radialSegments || 16,
            params.tubularSegments || 100,
          );
          break;
        case "plane":
          geometry = new THREE.PlaneGeometry(
            params.width || 1,
            params.height || 1,
          );
          break;
        default:
          console.error("Unknown primitive type: " + type);
          return null;
      }
      const material = new THREE.MeshPhongMaterial({
        color: params.color || 0x00ff00,
        shininess: 100,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (params.position) {
        mesh.position.set(
          params.position.x || 0,
          params.position.y || 0,
          params.position.z || 0,
        );
      }
      if (params.rotation) {
        mesh.rotation.set(
          params.rotation.x || 0,
          params.rotation.y || 0,
          params.rotation.z || 0,
        );
      }
      if (params.scale) {
        const scale = typeof params.scale === "number" ? params.scale : 1;
        mesh.scale.set(scale, scale, scale);
      }
      const objectName = name || type + "_" + Date.now();
      mesh.name = objectName;
      this._scene.add(mesh);
      this._objects.set(objectName, mesh);
      return mesh;
    });
  }
  setCamera(position, target) {
    this._queueOperation(() => {
      if (position) {
        this._camera.position.set(
          position.x || 0,
          position.y || 0,
          position.z || 0,
        );
      }
      if (target) {
        const targetVec = new THREE.Vector3(
          target.x || 0,
          target.y || 0,
          target.z || 0,
        );
        this._camera.lookAt(targetVec);
        this._controls.target = targetVec;
      }
    });
  }
  setBorder(color, width = 1) {
    this._borderColor = this._normalizeColor(color);
    this._borderWidth = width;
    this._applyBorderStyles();
  }
  removeBorder() {
    this._borderColor = null;
    this._borderWidth = 0;
    this._applyBorderStyles();
  }
  _applyBorderStyles() {
    if (!this._renderer || !this._renderer.domElement) return;
    if (this._borderColor && this._borderWidth > 0) {
      this._renderer.domElement.style.border =
        this._borderWidth + "px solid " + this._borderColor;
      this._renderer.domElement.style.boxSizing = "border-box";
    } else {
      this._renderer.domElement.style.border = "none";
      this._renderer.domElement.style.boxSizing = "content-box";
    }
  }
  getObjectByName(name) {
    return this._objects.get(name) || this._scene.getObjectByName(name);
  }
  clear() {
    this._queueOperation(() => {
      const toRemove = [];
      this._scene.traverse((child) => {
        if (child.isMesh || child.isGroup) {
          toRemove.push(child);
        }
      });
      toRemove.forEach((obj) => {
        this._scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this._objects.clear();
      this._animationMixer = null;
    });
  }
  render() {
    this._renderer.render(this._scene, this._camera);
  }
  setSize(width, height) {
    this._width = width;
    this._height = height;
    this._applyStyles();
    this._queueOperation(() => {
      if (this._renderer) {
        this._renderer.setSize(width, height);
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
      }
    });
  }
  async setGlbContent(glbContent) {
    this._glbContent = glbContent;
    if (glbContent && this._isReady) {
      return await this.loadGLB(glbContent);
    }
  }
  setBackgroundColor(color) {
    this._backgroundColor = color;
    this._queueOperation(() => {
      if (this._scene) {
        this._scene.background = new THREE.Color(color);
      }
    });
  }
  setAutoRotate(enabled) {
    this._autoRotate = enabled;
    if (this._controls) {
      this._controls.autoRotate = enabled;
    }
  }
  setShadows(enabled) {
    this._enableShadows = enabled;
    if (this._renderer) {
      this._renderer.shadowMap.enabled = enabled;
    }
  }
  _normalizeColor(color) {
    if (typeof color === "number") {
      return "#" + color.toString(16).padStart(6, "0");
    } else if (typeof color === "string") {
      if (color.startsWith("0x")) {
        return "#" + color.substring(2);
      }
      if (!color.startsWith("#")) {
        return "#" + color;
      }
      return color;
    }
    return "#ffffff";
  }
  _applyStyles() {
    if (!this._container) return;
    this._container.style.width = this._width + "px";
    this._container.style.height = this._height + "px";
    this._container.style.overflow = "hidden";
    this._container.style.backgroundColor = "#f8f8f8";
    this._container.style.borderRadius = "0";
  }
  _queueOperation(operation) {
    if (this._isReady) {
      operation();
    } else {
      this._pendingOperations.push(operation);
    }
  }
  _executePendingOperations() {
    while (this._pendingOperations.length > 0) {
      const operation = this._pendingOperations.shift();
      try {
        operation();
      } catch (error) {
        console.warn("Error executing pending operation:", error);
      }
    }
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  get enableShadows() {
    return this._enableShadows;
  }
  get autoRotate() {
    return this._autoRotate;
  }
  get isReady() {
    return this._isReady;
  }
  get scene() {
    return this._scene;
  }
  get camera() {
    return this._camera;
  }
  get renderer() {
    return this._renderer;
  }
  get controls() {
    return this._controls;
  }
  get glbContent() {
    return this._glbContent;
  }
  destroy() {
    this._isReady = false;
    this.clear();
    if (this._renderer) {
      this._renderer.dispose();
    }
    super.remove();
  }
};

HtmlSvgEdu.Text = class Text extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Text-Element mit Formatierung",
      en: "Text element with formatting",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example:
      'let myText = new Text("Hello World", "Arial", 16, 0x000000, "center");',
    constructor: {
      text: {
        name: "text",
        info: {
          en: "Text content to display (\\n for line break, <sub></sub> and <sup></sup> for subscript/superscript possible)",
          de: "Anzuzeigender Textinhalt (\\n für Zeilenwechsel, <sub></sub> und <sup></sup> für tiefgestellt/hochgestellt möglich)",
        },
      },
      font: {
        name: "font",
        info: {
          en: "Font family of the text",
          de: "Schriftart des Textes",
        },
      },
      fontSize: {
        name: "fontSize",
        info: {
          en: "Font size in pixels",
          de: "Schriftgröße in Pixeln",
        },
      },
      textColor: {
        name: "textColor",
        info: {
          en: "Color of the text (e.g. 0x000000)",
          de: "Farbe des Textes (z.B. 0x000000)",
        },
      },
      textAlign: {
        name: "textAlign",
        info: {
          en: "Text alignment (left, center, right)",
          de: "Textausrichtung (left, center, right)",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {
      setText: {
        name: "setText",
        info: {
          en: "Changes the text content",
          de: "Ändert den Textinhalt",
        },
        example:
          'setText("New text with <sub>subscript</sub> and <sup>superscript</sup>")',
      },
      setFont: {
        name: "setFont",
        info: {
          en: "Changes the font family",
          de: "Ändert die Schriftart",
        },
        example: 'setFont("Times New Roman")',
      },
      setFontSize: {
        name: "setFontSize",
        info: {
          en: "Changes the font size",
          de: "Ändert die Schriftgröße",
        },
        example: "setFontSize(24)",
      },
      setTextColor: {
        name: "setTextColor",
        info: {
          en: "Changes the text color",
          de: "Ändert die Textfarbe",
        },
        example: "setTextColor(0xFF0000)",
      },
    },
  };
  constructor(
    text = "Text",
    font = "Arial",
    fontSize = 16,
    textColor = 0x000000,
    textAlign = "left",
  ) {
    super();
    this._text = text;
    this._font = font;
    this._fontSize = fontSize;
    this._textColor = textColor;
    this._textAlign = textAlign;
    this._instanceId = "text-" + Math.random().toString(36).substr(2, 9);
    this._cssTextColor = this._hexToCSS(textColor);
    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-svg-text-container";
    this._svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    this._svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this._calculateSvgSize();
    this._addStyles();
    this._createTextElements();
    this._container.appendChild(this._svgElement);
    this._element = this._container;
  }
  _hexToCSS(hexColor) {
    const hex = hexColor.toString(16).padStart(6, "0");
    return "#" + hex;
  }
  _parseHtmlTags(text) {
    const parts = [];
    let currentPos = 0;
    const tagRegex = /<(sub|sup)>(.*?)<\/\1>/gi;
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      if (match.index > currentPos) {
        const beforeText = text.substring(currentPos, match.index);
        if (beforeText) {
          parts.push({ type: "normal", text: beforeText });
        }
      }
      parts.push({
        type: match[1].toLowerCase(),
        text: match[2],
      });
      currentPos = match.index + match[0].length;
    }
    if (currentPos < text.length) {
      const remainingText = text.substring(currentPos);
      if (remainingText) {
        parts.push({ type: "normal", text: remainingText });
      }
    }
    if (parts.length === 0) {
      parts.push({ type: "normal", text: text });
    }
    return parts;
  }
  _calculateTextDimensions() {
    const lines = this._text.split("\\n");
    let maxLineWidth = 0;
    let totalHeight = 0;
    lines.forEach((line) => {
      const parsedLine = this._parseHtmlTags(line);
      let lineWidth = 0;
      let lineHeight = this._fontSize;
      parsedLine.forEach((part) => {
        let charWidth, partHeight;
        if (part.type === "sub" || part.type === "sup") {
          const subSupSize = this._fontSize * 0.7;
          charWidth = part.text.length * (subSupSize * 0.6);
          partHeight = subSupSize;
        } else {
          charWidth = part.text.length * (this._fontSize * 0.6);
          partHeight = this._fontSize;
        }
        lineWidth += charWidth;
        lineHeight = Math.max(lineHeight, partHeight);
      });
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
      totalHeight += lineHeight;
    });
    if (lines.length > 1) {
      totalHeight += (lines.length - 1) * (this._fontSize * 0.2);
    }
    // Zusätzlicher Raum für Sub/Sup
    totalHeight += this._fontSize * 0.4;
    return {
      width: maxLineWidth,
      height: totalHeight,
      lineCount: lines.length,
      lines: lines,
    };
  }
  _calculateSvgSize() {
    const textDimensions = this._calculateTextDimensions();
    const padding = 20;
    const svgWidth = textDimensions.width + padding;
    const svgHeight = textDimensions.height + padding;
    this._svgElement.setAttribute("width", svgWidth);
    this._svgElement.setAttribute("height", svgHeight);
    this._svgElement.setAttribute(
      "viewBox",
      "0 0 " + svgWidth + " " + svgHeight,
    );
    this._textDimensions = textDimensions;
  }
  _addStyles() {
    const style = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style",
    );
    style.textContent =
      "/* Text-Stil für Instanz " +
      this._instanceId +
      " */" +
      "." +
      this._instanceId +
      "-label {" +
      "font-family: " +
      this._font +
      ";" +
      "font-size: " +
      this._fontSize +
      "px;" +
      "fill: " +
      this._cssTextColor +
      ";" +
      "dominant-baseline: middle;" +
      "user-select: none;" +
      "}" +
      "." +
      this._instanceId +
      "-sub {" +
      "font-size: " +
      this._fontSize * 0.7 +
      "px;" +
      "}" +
      "." +
      this._instanceId +
      "-sup {" +
      "font-size: " +
      this._fontSize * 0.7 +
      "px;" +
      "}";
    this._svgElement.appendChild(style);
  }
  _createTextElements() {
    const textDimensions = this._textDimensions;
    const svgWidth = parseInt(this._svgElement.getAttribute("width"));
    const svgHeight = parseInt(this._svgElement.getAttribute("height"));
    this._textGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    this._textGroup.setAttribute("class", "text-container");
    this._textGroup.setAttribute("id", this._instanceId);
    this._createStyledLabel(svgWidth, svgHeight);
    this._svgElement.appendChild(this._textGroup);
  }
  _createStyledLabel(svgWidth, svgHeight) {
    const lines = this._text.split("\\n");
    const lineHeight = this._fontSize * 1.2;
    const totalTextHeight = lines.length * lineHeight;
    const textStartY = svgHeight / 2 - totalTextHeight / 2;
    lines.forEach((line, lineIndex) => {
      const textElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      textElement.setAttribute("class", this._instanceId + "-label");
      let textX;
      let textAnchor = "start";
      switch (this._textAlign) {
        case "center":
          textX = svgWidth / 2;
          textAnchor = "middle";
          break;
        case "right":
          textX = svgWidth - 10;
          textAnchor = "end";
          break;
        default:
          textX = 10;
          textAnchor = "start";
          break;
      }
      textElement.setAttribute("x", textX.toString());
      // Baseline-Position ohne zusätzlichen Offset
      const baselineY = textStartY + (lineIndex + 0.5) * lineHeight;
      textElement.setAttribute("y", baselineY.toString());
      textElement.setAttribute("text-anchor", textAnchor);
      textElement.setAttribute("dominant-baseline", "middle");
      const parsedLine = this._parseHtmlTags(line);
      if (parsedLine.length === 1 && parsedLine[0].type === "normal") {
        textElement.textContent = parsedLine[0].text;
      } else {
        let currentX = 0;
        parsedLine.forEach((part, index) => {
          const tspan = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan",
          );
          tspan.textContent = part.text;

          if (part.type === "sub") {
            tspan.setAttribute("class", this._instanceId + "-sub");
            // Manuelle Positionierung für Chromium-Kompatibilität
            tspan.setAttribute("dy", (this._fontSize * 0.25).toString());
          } else if (part.type === "sup") {
            tspan.setAttribute("class", this._instanceId + "-sup");
            // Manuelle Positionierung für Chromium-Kompatibilität
            tspan.setAttribute("dy", (-this._fontSize * 0.35).toString());
          } else {
            // Zurücksetzen nach sub/sup
            if (index > 0) {
              const prevPart = parsedLine[index - 1];
              if (prevPart.type === "sub") {
                tspan.setAttribute("dy", (-this._fontSize * 0.25).toString());
              } else if (prevPart.type === "sup") {
                tspan.setAttribute("dy", (this._fontSize * 0.35).toString());
              }
            }
          }

          // Für center/right alignment: relative x-Position setzen
          if (
            index > 0 &&
            (this._textAlign === "center" || this._textAlign === "right")
          ) {
            tspan.setAttribute("dx", "0");
          }

          textElement.appendChild(tspan);
        });
      }
      this._textGroup.appendChild(textElement);
    });
  }
  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
    this._refreshText();
  }
  setText(text) {
    this._text = text;
    this._refreshText();
  }
  setFont(font) {
    this._font = font;
    this._updateStyles();
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize;
    this._refreshText();
  }
  setTextColor(textColor) {
    this._textColor = textColor;
    this._cssTextColor = this._hexToCSS(textColor);
    this._updateStyles();
  }
  setTextAlign(textAlign) {
    this._textAlign = textAlign;
    this._refreshText();
  }
  _updateStyles() {
    const oldStyle = this._svgElement.querySelector("style");
    if (oldStyle) {
      oldStyle.remove();
    }
    this._addStyles();
  }
  _refreshText() {
    if (this._textGroup) {
      this._textGroup.remove();
      this._calculateSvgSize();
      this._updateStyles();
      this._createTextElements();
    }
  }
};
HtmlSvgEdu.Preloader = class Preloader extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Ladeanzeige mit Spinner",
      en: "Loading indicator with spinner",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example:
      'let myPreloader = new Preloader("Loading...", true, 0xF5F5F5, 0x666666);',
    constructor: {
      text: {
        name: "text",
        info: {
          en: "Loading text to display",
          de: "Anzuzeigender Ladetext",
        },
      },
      showSpinner: {
        name: "showSpinner",
        info: {
          en: "Show animated spinner",
          de: "Animierten Spinner anzeigen",
        },
      },
      backgroundColor: {
        name: "backgroundColor",
        info: {
          en: "Background color (e.g. 0xF5F5F5)",
          de: "Hintergrundfarbe (z.B. 0xF5F5F5)",
        },
      },
      spinnerColor: {
        name: "spinnerColor",
        info: {
          en: "Spinner color (e.g. 0x666666)",
          de: "Spinner-Farbe (z.B. 0x666666)",
        },
      },
    },
    setter: {
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the preloader",
          de: "Sichtbarkeit des Preloaders",
        },
        example: "visible = false",
      },
    },
    methods: {
      show: {
        name: "show",
        info: {
          en: "Shows the preloader",
          de: "Zeigt den Preloader an",
        },
        example: "show()",
      },
      hide: {
        name: "hide",
        info: {
          en: "Hides the preloader with fade out",
          de: "Blendet den Preloader aus",
        },
        example: "hide()",
      },
      setText: {
        name: "setText",
        info: {
          en: "Changes the loading text",
          de: "Ändert den Ladetext",
        },
        example: 'setText("Loading assets...")',
      },
    },
  };
  constructor(
    text = "",
    showSpinner = true,
    backgroundColor = 0xf5f5f5,
    spinnerColor = 0x666666,
  ) {
    super();
    this._text = text;
    this._showSpinner = showSpinner;
    this._showText = text !== "";
    this._backgroundColor = backgroundColor;
    this._spinnerColor = spinnerColor;
    this._isAnimating = false;
    this._instanceId = "preloader-" + Math.random().toString(36).substr(2, 9);
    this._cssBackgroundColor = this._hexToCSS(backgroundColor);
    this._cssSpinnerColor = this._hexToCSS(spinnerColor);
    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-preloader-overlay";
    this._container.id = this._instanceId;
    this._container.style.position = "absolute";
    this._container.style.top = "0";
    this._container.style.left = "0";
    this._container.style.width = "100%";
    this._container.style.height = "100%";
    this._container.style.backgroundColor = this._cssBackgroundColor;
    this._container.style.display = "flex";
    this._container.style.alignItems = "center";
    this._container.style.justifyContent = "center";
    this._container.style.flexDirection = "column";
    this._container.style.zIndex = "9999";
    this._container.style.transition = "opacity 0.3s ease-out";
    this._container.style.opacity = "1";
    this._addStyles();
    this._createContent();
    this._element = this._container;
    this.show();
  }
  _hexToCSS(hexColor) {
    const hex = hexColor.toString(16).padStart(6, "0");
    return "#" + hex;
  }
  _addStyles() {
    if (document.getElementById(this._instanceId + "-styles")) return;
    const styleElement = document.createElement("style");
    styleElement.id = this._instanceId + "-styles";
    styleElement.textContent =
      "#" +
      this._instanceId +
      ".hiding {" +
      "opacity: 0 !important;" +
      "pointer-events: none;" +
      "}" +
      "#" +
      this._instanceId +
      " .spinner {" +
      "width: 40px;" +
      "height: 40px;" +
      "border: 3px solid rgba(0, 0, 0, 0.1);" +
      "border-top-color: " +
      this._cssSpinnerColor +
      ";" +
      "border-radius: 50%;" +
      "animation: " +
      this._instanceId +
      "-spin 1s linear infinite;" +
      "margin-bottom: 15px;" +
      "}" +
      "@keyframes " +
      this._instanceId +
      "-spin {" +
      "to { transform: rotate(360deg); }" +
      "}" +
      "#" +
      this._instanceId +
      " .loading-text {" +
      "font-family: Arial, sans-serif;" +
      "font-size: 14px;" +
      "color: " +
      this._cssSpinnerColor +
      ";" +
      "display: flex;" +
      "align-items: center;" +
      "}" +
      "#" +
      this._instanceId +
      " .dots {" +
      "display: inline-block;" +
      "width: 20px;" +
      "margin-left: 2px;" +
      "}" +
      "#" +
      this._instanceId +
      " .dots::after {" +
      "content: '...';" +
      "animation: " +
      this._instanceId +
      "-dots 1.5s infinite;" +
      "}" +
      "@keyframes " +
      this._instanceId +
      "-dots {" +
      "0%, 20% { content: ''; }" +
      "40% { content: '.'; }" +
      "60% { content: '..'; }" +
      "80%, 100% { content: '...'; }" +
      "}";
    document.head.appendChild(styleElement);
  }
  _createContent() {
    if (this._showSpinner) {
      this._spinner = document.createElement("div");
      this._spinner.className = "spinner";
      this._container.appendChild(this._spinner);
    }
    if (this._showText && this._text) {
      const textContainer = document.createElement("div");
      textContainer.className = "loading-text";
      this._textElement = document.createElement("span");
      this._textElement.textContent = this._text;
      textContainer.appendChild(this._textElement);
      const dots = document.createElement("span");
      dots.className = "dots";
      textContainer.appendChild(dots);
      this._container.appendChild(textContainer);
    }
  }
  setDimensions(width, height) {
    if (this._container) {
      this._container.style.width = width + "px";
      this._container.style.height = height + "px";
    }
  }
  show() {
    this._container.classList.remove("hiding");
    this._container.style.display = "flex";
    this._isAnimating = false;
  }
  hide(duration = 300) {
    if (this._isAnimating) return;
    this._isAnimating = true;
    this._container.classList.add("hiding");
    setTimeout(() => {
      this._container.style.display = "none";
      this._isAnimating = false;
    }, duration);
  }
  setText(text) {
    this._text = text;
    this._showText = text !== "";
    const existingTextContainer =
      this._container.querySelector(".loading-text");
    if (existingTextContainer) {
      existingTextContainer.remove();
    }
    if (this._showText && this._text) {
      const textContainer = document.createElement("div");
      textContainer.className = "loading-text";
      this._textElement = document.createElement("span");
      this._textElement.textContent = this._text;
      textContainer.appendChild(this._textElement);
      const dots = document.createElement("span");
      dots.className = "dots";
      textContainer.appendChild(dots);
      this._container.appendChild(textContainer);
    } else {
      this._textElement = null;
    }
  }
  setSpinnerVisibility(visible) {
    this._showSpinner = visible;
    if (this._spinner) {
      this._spinner.style.display = visible ? "block" : "none";
    }
  }
  set visible(value) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }
  get visible() {
    return (
      this._container.style.display !== "none" &&
      !this._container.classList.contains("hiding")
    );
  }
  destroy() {
    const styleElement = document.getElementById(this._instanceId + "-styles");
    if (styleElement) {
      styleElement.remove();
    }
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  }
};

HtmlSvgEdu.ParameterTable = class ParameterTable extends HtmlSvgEdu.Component {
  static serializationMap = {
    description: {
      de: "Parameter-Tabelle mit editierbaren Werten",
      en: "Parameter table with editable values",
    },
    weblink: {
      de: "https://www.educational-animation.org",
      en: "https://www.educational-animation.org",
    },
    example:
      'let myTable = new ParameterTable([{name: "Speed", value: 50}], 300);',
    constructor: {
      parameters: {
        name: "parameters",
        info: {
          en: 'Array of parameter objects with name and value [{name: "Parameter", value: 123}]',
          de: 'Array von Parameter-Objekten mit Name und Wert [{name: "Parameter", value: 123}]',
        },
      },
      width: {
        name: "width",
        info: {
          en: "Width of the table in pixels",
          de: "Breite der Tabelle in Pixeln",
        },
      },
      font: {
        name: "font",
        info: {
          en: "Font family of the text",
          de: "Schriftart des Textes",
        },
      },
      fontSize: {
        name: "fontSize",
        info: {
          en: "Font size in pixels",
          de: "Schriftgröße in Pixeln",
        },
      },
      textColor: {
        name: "textColor",
        info: {
          en: "Text color (e.g. 0x000000)",
          de: "Textfarbe (z.B. 0x000000)",
        },
      },
    },
    setter: {
      x: {
        name: "x",
        info: {
          en: "Horizontal position of the element",
          de: "Horizontale Position des Elements",
        },
        example: "x = 100",
      },
      y: {
        name: "y",
        info: {
          en: "Vertical position of the element",
          de: "Vertikale Position des Elements",
        },
        example: "y = 200",
      },
      visible: {
        name: "visible",
        info: {
          en: "Visibility of the element (true/false)",
          de: "Sichtbarkeit des Elements (true/false)",
        },
        example: "visible = true",
      },
    },
    methods: {
      setTitle: {
        name: "setTitle",
        info: {
          en: "Sets the table title/header",
          de: "Setzt die Tabellenüberschrift",
        },
        example: 'setTitle("Configuration")',
      },
      setValue: {
        name: "setValue",
        info: {
          en: "Sets the value of a parameter by name",
          de: "Setzt den Wert eines Parameters anhand des Namens",
        },
        example: 'setValue("Speed", 50)',
      },
      getValue: {
        name: "getValue",
        info: {
          en: "Gets the value of a parameter by name",
          de: "Gibt den Wert eines Parameters anhand des Namens zurück",
        },
        example: 'getValue("Speed")',
      },
      setValueLimits: {
        name: "setValueLimits",
        info: {
          en: "Sets min/max limits for a parameter value",
          de: "Setzt Min/Max-Grenzen für einen Parameterwert",
        },
        example: 'setValueLimits("Speed", 0, 100)',
      },
      setDecimalSeparator: {
        name: "setDecimalSeparator",
        info: {
          en: 'Sets decimal separator ("." or ",")',
          de: 'Setzt das Dezimaltrennzeichen ("." oder ",")',
        },
        example: 'setDecimalSeparator(",")',
      },
      setRounding: {
        name: "setRounding",
        info: {
          en: "Sets rounding precision for a parameter (e.g. 0.01 for 2 decimals, 1 for integers)",
          de: "Setzt die Rundungsgenauigkeit für einen Parameter (z.B. 0.01 für 2 Dezimalstellen, 1 für Ganzzahlen)",
        },
        example: 'setRounding("Speed", 0.01)',
      },
      addParameter: {
        name: "addParameter",
        info: {
          en: "Adds a new parameter to the table",
          de: "Fügt einen neuen Parameter zur Tabelle hinzu",
        },
        example: 'addParameter("New Param", 0)',
      },
      removeParameter: {
        name: "removeParameter",
        info: {
          en: "Removes a parameter from the table",
          de: "Entfernt einen Parameter aus der Tabelle",
        },
        example: 'removeParameter("Speed")',
      },
      onChange: {
        name: "onChange",
        info: {
          en: "Adds an event listener for value changes",
          de: "Fügt einen Event-Listener für Wertänderungen hinzu",
        },
        example:
          "onChange(handleChange);\n\nfunction handleChange(event) { console.log(event.parameterName, event.newValue); }",
      },
    },
  };
  constructor(
    parameters = [],
    width = 300,
    font = "Arial",
    fontSize = 14,
    textColor = 0x000000,
  ) {
    super();
    this._parameters = parameters || [];
    this._width = width;
    this._font = font;
    this._fontSize = fontSize;
    this._textColor = textColor;
    this._title = "";
    this._decimalSeparator = ".";
    this._valueLimits = new Map();
    this._rounding = new Map();
    this._defaultRounding = 0.001;
    this._cssTextColor = this._hexToCSS(textColor);
    this._container = this._createElement("div");
    this._container.className = "pixi-html-ui pixi-parameter-table";
    this._addStyles();
    this._createTable();
    this._element = this._container;
    this._populateTable();
  }
  _hexToCSS(hexColor) {
    const hex = hexColor.toString(16).padStart(6, "0");
    return "#" + hex;
  }
  _addStyles() {
    if (document.getElementById("parameter-table-styles")) return;
    const styleElement = document.createElement("style");
    styleElement.id = "parameter-table-styles";
    styleElement.textContent =
      ".pixi-parameter-table {\n" +
      "    background-color: rgba(255, 255, 255, 0.95);\n" +
      "    border: 1px solid #ccc;\n" +
      "    border-radius: 4px;\n" +
      "    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n" +
      "    overflow: hidden;\n" +
      "}\n" +
      ".pixi-parameter-table table {\n" +
      "    width: 100%;\n" +
      "    border-collapse: collapse;\n" +
      "    margin: 0;\n" +
      "}\n" +
      ".pixi-parameter-table-title {\n" +
      "    background-color: #f0f0f0;\n" +
      "    padding: 8px 12px;\n" +
      "    font-weight: bold;\n" +
      "    text-align: center;\n" +
      "    border-bottom: 1px solid #ddd;\n" +
      "}\n" +
      ".pixi-parameter-table th,\n" +
      ".pixi-parameter-table td {\n" +
      "    padding: 6px 12px;\n" +
      "    text-align: left;\n" +
      "    border-bottom: 1px solid #eee;\n" +
      "}\n" +
      ".pixi-parameter-table th {\n" +
      "    background-color: #f8f8f8;\n" +
      "    font-weight: normal;\n" +
      "    width: 50%;\n" +
      "}\n" +
      ".pixi-parameter-table td {\n" +
      "    background-color: #fff;\n" +
      "}\n" +
      ".pixi-parameter-table tr:last-child th,\n" +
      ".pixi-parameter-table tr:last-child td {\n" +
      "    border-bottom: none;\n" +
      "}\n" +
      ".pixi-parameter-table input {\n" +
      "    width: 100%;\n" +
      "    padding: 4px 6px;\n" +
      "    border: 1px solid #ddd;\n" +
      "    border-radius: 3px;\n" +
      "    font-family: inherit;\n" +
      "    font-size: inherit;\n" +
      "    color: inherit;\n" +
      "    background-color: #fff;\n" +
      "    box-sizing: border-box;\n" +
      "    transition: border-color 0.2s;\n" +
      "}\n" +
      ".pixi-parameter-table input:focus {\n" +
      "    outline: none;\n" +
      "    border-color: #228B22;\n" +
      "}\n" +
      ".pixi-parameter-table input:hover {\n" +
      "    border-color: #999;\n" +
      "}\n" +
      ".pixi-parameter-table input.error {\n" +
      "    border-color: #ff4444;\n" +
      "    background-color: #fff5f5;\n" +
      "}\n";
    document.head.appendChild(styleElement);
  }
  _createTable() {
    this._titleElement = document.createElement("div");
    this._titleElement.className = "pixi-parameter-table-title";
    this._titleElement.style.display = "none";
    this._container.appendChild(this._titleElement);
    this._table = document.createElement("table");
    this._tableBody = document.createElement("tbody");
    this._table.appendChild(this._tableBody);
    this._container.appendChild(this._table);
    this._applyStyles();
  }
  _applyStyles() {
    if (!this._container) return;
    this._container.style.width = this._width + "px";
    if (this._titleElement) {
      this._titleElement.style.fontFamily = this._font;
      this._titleElement.style.fontSize = this._fontSize + 2 + "px";
      this._titleElement.style.color = this._cssTextColor;
    }
    if (this._table) {
      this._table.style.fontFamily = this._font;
      this._table.style.fontSize = this._fontSize + "px";
      this._table.style.color = this._cssTextColor;
    }
  }
  _populateTable() {
    this._tableBody.innerHTML = "";
    this._parameters.forEach((param, index) => {
      this._createParameterRow(param, index);
    });
  }
  _createParameterRow(param, index) {
    const row = document.createElement("tr");
    const labelCell = document.createElement("th");
    labelCell.textContent = param.name;
    row.appendChild(labelCell);
    const valueCell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.value = this._formatValue(
      this._roundValue(param.value, param.name),
      param.name,
    );
    input.dataset.parameterIndex = index;
    input.dataset.parameterName = param.name;
    input.addEventListener("input", (e) => this._handleInput(e));
    input.addEventListener("change", (e) => this._handleChange(e));
    input.addEventListener("blur", (e) => this._handleBlur(e));
    valueCell.appendChild(input);
    row.appendChild(valueCell);
    this._tableBody.appendChild(row);
  }
  _roundValue(value, parameterName) {
    const rounding = this._rounding.has(parameterName)
      ? this._rounding.get(parameterName)
      : this._defaultRounding;
    if (rounding > 0) {
      return Math.round(value / rounding) * rounding;
    }
    return value;
  }
  _formatValue(value, parameterName) {
    const rounding =
      parameterName && this._rounding.has(parameterName)
        ? this._rounding.get(parameterName)
        : this._defaultRounding;
    let decimals = 0;
    if (rounding < 1) {
      decimals = Math.max(0, -Math.floor(Math.log10(rounding)));
    }
    let formattedValue = value.toFixed(decimals);
    if (formattedValue.includes(".")) {
      formattedValue = formattedValue.replace(/\.?0+$/, "");
    }
    if (this._decimalSeparator === ",") {
      formattedValue = formattedValue.replace(".", ",");
    }
    return formattedValue;
  }
  _parseValue(valueStr) {
    if (typeof valueStr !== "string") {
      valueStr = String(valueStr);
    }
    const normalizedValue = valueStr.replace(",", ".");
    return parseFloat(normalizedValue);
  }
  _handleInput(event) {
    const input = event.target;
    const parameterName = input.dataset.parameterName;
    const value = this._parseValue(input.value);
    if (!isNaN(value)) {
      if (this._valueLimits.has(parameterName)) {
        const limits = this._valueLimits.get(parameterName);
        if (value < limits.min || value > limits.max) {
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      } else {
        input.classList.remove("error");
      }
    } else if (
      input.value !== "" &&
      input.value !== "-" &&
      input.value !== this._decimalSeparator
    ) {
      input.classList.add("error");
    }
  }
  _handleChange(event) {
    const input = event.target;
    const parameterIndex = parseInt(input.dataset.parameterIndex);
    const parameterName = input.dataset.parameterName;
    const value = this._parseValue(input.value);
    if (!isNaN(value)) {
      let finalValue = value;
      if (this._valueLimits.has(parameterName)) {
        const limits = this._valueLimits.get(parameterName);
        finalValue = Math.max(limits.min, Math.min(limits.max, value));
      }
      finalValue = this._roundValue(finalValue, parameterName);
      this._parameters[parameterIndex].value = finalValue;
      input.value = this._formatValue(finalValue, parameterName);
      input.classList.remove("error");
      const customEvent = new CustomEvent("parameter-change", {
        detail: {
          component: this,
          parameterName: parameterName,
          parameterIndex: parameterIndex,
          oldValue: value,
          newValue: finalValue,
        },
      });
      customEvent.parameterName = parameterName;
      customEvent.newValue = finalValue;
      this._element.dispatchEvent(customEvent);
    } else {
      input.value = this._formatValue(
        this._parameters[parameterIndex].value,
        parameterName,
      );
      input.classList.remove("error");
    }
  }
  _handleBlur(event) {
    const input = event.target;
    const parameterIndex = parseInt(input.dataset.parameterIndex);
    if (input.classList.contains("error")) {
      const parameterName = input.dataset.parameterName;
      input.value = this._formatValue(
        this._parameters[parameterIndex].value,
        parameterName,
      );
      input.classList.remove("error");
    }
  }
  setTitle(title) {
    this._title = title;
    if (this._titleElement) {
      if (title) {
        this._titleElement.textContent = title;
        this._titleElement.style.display = "block";
      } else {
        this._titleElement.style.display = "none";
      }
    }
  }
  setValue(parameterName, value) {
    const paramIndex = this._parameters.findIndex(
      (p) => p.name === parameterName,
    );
    if (paramIndex !== -1) {
      let finalValue = value;
      if (this._valueLimits.has(parameterName)) {
        const limits = this._valueLimits.get(parameterName);
        finalValue = Math.max(limits.min, Math.min(limits.max, value));
      }
      finalValue = this._roundValue(finalValue, parameterName);
      this._parameters[paramIndex].value = finalValue;
      const input = this._tableBody.querySelector(
        'input[data-parameter-name="' + parameterName + '"]',
      );
      if (input) {
        input.value = this._formatValue(finalValue, parameterName);
      }
    }
  }
  getValue(parameterName) {
    const param = this._parameters.find((p) => p.name === parameterName);
    return param ? param.value : null;
  }
  setValueLimits(parameterName, min, max) {
    this._valueLimits.set(parameterName, { min: min, max: max });
    const paramIndex = this._parameters.findIndex(
      (p) => p.name === parameterName,
    );
    if (paramIndex !== -1) {
      const currentValue = this._parameters[paramIndex].value;
      const limitedValue = Math.max(min, Math.min(max, currentValue));
      if (limitedValue !== currentValue) {
        this.setValue(parameterName, limitedValue);
      }
    }
  }
  removeValueLimits(parameterName) {
    this._valueLimits.delete(parameterName);
  }
  setRounding(parameterName, rounding) {
    if (rounding > 0) {
      this._rounding.set(parameterName, rounding);
      const paramIndex = this._parameters.findIndex(
        (p) => p.name === parameterName,
      );
      if (paramIndex !== -1) {
        const currentValue = this._parameters[paramIndex].value;
        const roundedValue = this._roundValue(currentValue, parameterName);
        if (roundedValue !== currentValue) {
          this.setValue(parameterName, roundedValue);
        }
      }
    }
  }
  removeRounding(parameterName) {
    this._rounding.delete(parameterName);
  }
  setDefaultRounding(rounding) {
    if (rounding > 0) {
      this._defaultRounding = rounding;
      this._parameters.forEach((param, index) => {
        if (!this._rounding.has(param.name)) {
          const roundedValue = this._roundValue(param.value, param.name);
          if (roundedValue !== param.value) {
            this.setValue(param.name, roundedValue);
          }
        }
      });
    }
  }
  setDecimalSeparator(separator) {
    if (separator === "," || separator === ".") {
      this._decimalSeparator = separator;
      this._populateTable();
    }
  }
  setFont(font) {
    this._font = font;
    this._applyStyles();
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize;
    this._applyStyles();
  }
  setTextColor(textColor) {
    this._textColor = textColor;
    this._cssTextColor = this._hexToCSS(textColor);
    this._applyStyles();
  }
  addParameter(name, value = 0) {
    if (this._parameters.find((p) => p.name === name)) {
      console.warn('Parameter "' + name + '" already exists');
      return;
    }
    const roundedValue = this._roundValue(value, name);
    this._parameters.push({ name: name, value: roundedValue });
    this._createParameterRow(
      { name: name, value: roundedValue },
      this._parameters.length - 1,
    );
  }
  removeParameter(name) {
    const index = this._parameters.findIndex((p) => p.name === name);
    if (index !== -1) {
      this._parameters.splice(index, 1);
      this._valueLimits.delete(name);
      this._rounding.delete(name);
      this._populateTable();
    }
  }
  getAllParameters() {
    return this._parameters.map((p) => ({ name: p.name, value: p.value }));
  }
  onChange(callback) {
    if (this._element) {
      this._element.addEventListener("parameter-change", callback);
    }
  }
  get parameters() {
    return this._parameters;
  }
  get title() {
    return this._title;
  }
  get decimalSeparator() {
    return this._decimalSeparator;
  }
  get defaultRounding() {
    return this._defaultRounding;
  }
  getRounding(parameterName) {
    return this._rounding.has(parameterName)
      ? this._rounding.get(parameterName)
      : this._defaultRounding;
  }
};
