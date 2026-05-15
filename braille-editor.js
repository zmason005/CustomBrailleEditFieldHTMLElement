/**
 * BrailleEditor - A custom web component for specialized Braille editing.
 * Prioritizes tactile display layouts with isolated left/right gutters.
 */
class BrailleEditor extends HTMLElement {
  constructor() {
    super();
    // Attach a private Shadow DOM to encapsulate styling and row structure
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  /**
   * Generates the component's internal HTML and encapsulated CSS layout.
   */
  render() {
    // Read user configurations or fall back to defaults (e.g., 40-cell display standard)
    const centerWidth = this.getAttribute('center-width') || '40';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Courier New', Courier, monospace;
          margin: 20px auto;
          max-width: 800px;
          background: #000000;
          border: 2px solid #D4AF37;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(212, 175, 55, 0.25);
          overflow: hidden;
        }

        .editor-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* The 3-Column Layout Row */
        .braille-row {
          display: flex;
          align-items: stretch;
          border-bottom: 1px solid #333333;
        }

        .braille-row:last-child {
          border-bottom: none;
        }

        /* Gutter Styling */
        .gutter {
          background-color: #111111;
          color: #888888;
          font-size: 14px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none; /* Prevents text selection from spilling into gutters */
          min-width: 60px;
          text-align: center;
        }

        .gutter-left {
          border-right: 1px solid #222222;
          color: #D4AF37; /* Gold accent for line identifiers */
        }

        .gutter-right {
          border-left: 1px solid #222222;
          font-size: 12px;
        }

        /* Center Content-Editable Area */
        .content-area {
          flex: 1;
          background-color: #000000;
          color: #FFFFFF;
          padding: 10px;
          font-size: 18px;
          outline: none;
          white-space: pre-wrap;
          word-break: break-all;
          caret-color: #D4AF37; /* Gold flashing cursor */
        }

        .content-area:focus {
          background-color: #050505;
        }
      </style>

      <div class="editor-container">
        <div class="braille-row">
          <div class="gutter gutter-left" aria-hidden="true" data-type="left">001</div>
          
          <div class="content-area" contenteditable="true" spellcheck="false" data-type="center"></div>
          
          <div class="gutter gutter-right" aria-hidden="true" data-type="right">p.1</div>
        </div>
      </div>
    `;
  }

  /**
   * Binds event listeners to track changes inside the contenteditable element.
   */
  setupEventListeners() {
    const centerArea = this.shadowRoot.querySelector('[data-type="center"]');
    const leftGutter = this.shadowRoot.querySelector('[data-type="left"]');
    const rightGutter = this.shadowRoot.querySelector('[data-type="right"]');

    if (centerArea) {
      // Use 'input' event to capture typing, paste actions, and hardware braille key releases
      centerArea.addEventListener('input', (event) => {
        this.handleTextStitching(leftGutter, centerArea, rightGutter);
      });
    }
  }

  /**
   * Extracts data from all 3 columns, stitches them into a singular line array, 
   * and reports back to the debugging console.
   */
  handleTextStitching(leftEl, centerEl, rightEl) {
    const leftText = leftEl ? leftEl.textContent.trim() : '';
    const centerText = centerEl ? centerEl.innerText : ''; // Preserves spacing structure better than textContent
    const rightText = rightEl ? rightEl.textContent.trim() : '';

    // Stitch the columns cleanly together
    const stitchedString = `[${leftText}] ${centerText} [${rightText}]`;

    // Console logging the output per the workflow requirements
    console.log('Stitched String:', stitchedString);

    // Optional: This is where you update an global hidden screen-reader aria-label 
    // to feed a flawless uninterrupted line directly to a 40-cell grid display.
  }
}

// Register the element globally so the browser recognizes <braille-editor>
customElements.define('braille-editor', BrailleEditor);
