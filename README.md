# Custom `<braille-editor>` Web Component

An open-source, high-contrast, accessible text layout component written in raw, modular JavaScript. This custom element is explicitly architected to build software environments through a "Braille-centric lens"—optimizing line structures for multi-cell physical refreshable displays.

## 🛠️ Features
- **Shadow DOM Encapsulation**: Layout styling and internal structure are protected completely from external stylesheet contamination or side effects.
- **Three-Column Stitched Output**: Isolates text margins (`left-gutter`, `center-editable`, `right-gutter`) clean of screen-reader interference using native attributes.
- **Accessibility Safeguarded**: Gutters are reinforced using `aria-hidden="true"` and `user-select: none` to guarantee screen-readers ignore line coordinates and purely speak/read raw input lines.

## 📋 Configurations & Attributes
The component can be customized directly within standard HTML markup parameters:

| Attribute | Default Value | Description |
| :--- | :--- | :--- |
| `center-width` | `40` | Configures target limits matching standard portable 40-cell row displays. |

```html
<braille-editor center-width="40"></braille-editor>
