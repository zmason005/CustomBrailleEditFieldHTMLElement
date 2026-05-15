# CustomBrailleEditFieldHTMLElement

A custom HTML element for editing Braille text with accessibility and usability in mind.

## Overview

CustomBrailleEditFieldHTMLElement provides a reusable, standards-compliant HTML element that enables easy input and editing of Braille text. This component is designed with accessibility as a core feature, making it suitable for assistive technology users and Braille learners alike.

## Features

- **Custom HTML Element**: Built as a web component following the HTML Standard
- **Accessible**: ARIA support and keyboard navigation built-in
- **Easy to Use**: Simple API for integrating Braille editing into your projects
- **Lightweight**: Minimal dependencies for fast loading and high performance

## Installation

```bash
npm install custom-braille-edit-field-html-element
```

Or include directly in your HTML:

```html
<script src="path/to/custom-braille-edit-field.js"></script>
```

## Usage

### Basic Example

```html
<custom-braille-edit-field></custom-braille-edit-field>

<script>
  const brailleField = document.querySelector('custom-braille-edit-field');
  
  // Get the Braille content
  const content = brailleField.value;
  
  // Set Braille content
  brailleField.value = 'Braille text here';
  
  // Listen for changes
  brailleField.addEventListener('change', (event) => {
    console.log('New content:', event.target.value);
  });
</script>
```

### Attributes

- `placeholder`: Placeholder text to display when empty
- `disabled`: Disable the field
- `readonly`: Make the field read-only
- `value`: Get or set the Braille content

## API

### Properties

- `value` (string): Get or set the current Braille text content

### Methods

- `focus()`: Focus the Braille edit field
- `blur()`: Remove focus from the Braille edit field
- `clear()`: Clear the field content

### Events

- `input`: Fired when the content is being edited
- `change`: Fired when the content has finished changing
- `focus`: Fired when the field receives focus
- `blur`: Fired when the field loses focus

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+

## Accessibility

This component is built with accessibility at its core:

- Full keyboard navigation support
- ARIA attributes for screen reader compatibility
- Focus management
- Clear error messaging
- High contrast support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/zmason005/CustomBrailleEditFieldHTMLElement).
