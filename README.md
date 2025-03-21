# Text List to JS Array Converter

A simple web application that converts text input (URLs or any text) into various JavaScript array formats or markdown lists.

## Features

- Multiple output formats:
  - Simple Array: `[item1, item2]`
  - Single Quotes: `['item1', 'item2']`
  - Template Literals: ``[`item1`, `item2`]``
  - Markdown Links: Converts URLs to markdown list format with hostname as link text
- Handles both line breaks and commas as separators
- Copy to clipboard functionality

## Usage

1. Enter your text in the input area (one item per line or comma-separated)
2. Select your desired output format
3. The converted array will appear in real-time on the right
4. Click "Copy Array" to copy the result to your clipboard

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
