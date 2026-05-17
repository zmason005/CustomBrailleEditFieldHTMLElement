/* braille-editor.js */

class BrailleEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: monospace;
          background-color: #000000;
          color: #FFD700;
          border: 2px solid #FFD700;
          border-radius: 4px;
          padding: 10px;
        }
        .editor-container {
          display: flex;
          width: 100%;
          line-height: 1.5;
        }
        .gutter {
          padding: 0 10px;
          user-select: none;
          background-color: #111;
          white-space: pre;
          text-align: right;
        }
        .gutter-left {
          color: #888;
          border-right: 1px solid #FFD700;
        }
        .gutter-right {
          color: #FFD700;
          border-left: 1px solid #FFD700;
          text-align: left;
        }
        .text-column {
          flex-grow: 1;
          padding: 0 15px;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .hidden-buffer {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
      </style>

      <div class="editor-container" aria-hidden="true">
        <div class="gutter gutter-left" id="visualLeft">001</div>
        <div class="text-column" id="visualText"></div>
        <div class="gutter gutter-right" id="visualRight"></div>
      </div>

      <textarea class="hidden-buffer" id="brailleInput" spellcheck="false"></textarea>
    `;

    this.inputBuffer = this.shadowRoot.getElementById('brailleInput');
    this.visualText = this.shadowRoot.getElementById('visualText');
    this.visualLeft = this.shadowRoot.getElementById('visualLeft');
    this.visualRight = this.shadowRoot.getElementById('visualRight');

    // Default right gutter fallback setup
    this.rightGutterEngine = (lineText) => `${lineText.length}ch`;
  }

  connectedCallback() {
    this.inputBuffer.addEventListener('input', () => this.updateEditor());
    this.inputBuffer.addEventListener('keyup', () => this.updateEditor());
    this.inputBuffer.addEventListener('click', () => this.updateEditor());
    this.shadowRoot.addEventListener('click', () => this.inputBuffer.focus());
    
    this.updateEditor();
  }

  /**
   * Inject a custom user-defined function for processing the right gutter.
   * @param {Function} callback - Accepts a string (line text), returns a string.
   */
  setRightGutterFunction(callback) {
    if (typeof callback === 'function') {
      this.rightGutterEngine = callback;
      this.updateEditor(); 
    }
  }

  updateEditor() {
    const text = this.inputBuffer.value || "";
    const selectionStart = this.inputBuffer.selectionStart;
    const lines = text.split('\n');
    
    if (lines.length === 0 || (lines.length === 1 && lines[0] === "")) {
      lines[0] = "";
    }

    let currentLineIndex = 0;
    let characterCounter = 0;

    for (let i = 0; i < lines.length; i++) {
      const nextCounter = characterCounter + lines[i].length + 1;
      if (selectionStart >= characterCounter && selectionStart < nextCounter) {
        currentLineIndex = i;
      }
      characterCounter = nextCounter;
    }

    if (selectionStart === text.length) {
      currentLineIndex = lines.length - 1;
    }

    const activeLineText = lines[currentLineIndex];

    // --- VISUAL RENDERING ---
    this.visualText.textContent = text + " "; 

    this.visualLeft.innerHTML = lines.map((_, idx) => 
      String(idx + 1).padStart(3, '0')
    ).join('\n');

    const rightGutterTracks = lines.map((lineContent) => {
      return this.rightGutterEngine(lineContent);
    });
    this.visualRight.innerHTML = rightGutterTracks.join('\n');

    // --- ACCESSIBILITY STITCHING ---
    const leftGutterBraille = String(currentLineIndex + 1).padStart(3, '0');
    const rightGutterBraille = this.rightGutterEngine(activeLineText);

    const stitchedBrailleLine = `${leftGutterBraille} ${activeLineText} [${rightGutterBraille}]`;
    this.inputBuffer.setAttribute('aria-label', stitchedBrailleLine);
  }
}

customElements.define('braille-editor', BrailleEditor);
