import React from 'react';
import { ClipboardCopy, Link2 } from 'lucide-react';

type ArrayFormat = 'simple' | 'quoted' | 'template' | 'markdown';

function App() {
  const [input, setInput] = React.useState('');
  const [format, setFormat] = React.useState<ArrayFormat>('quoted');
  const [copied, setCopied] = React.useState(false);

  const splitInput = (text: string): string[] => {
    return text
      .split(/[\n,]/)
      .map(line => line.trim())
      .filter(line => line !== '');
  };

  const convertToArray = (text: string, format: ArrayFormat): string => {
    const lines = splitInput(text);
    
    switch (format) {
      case 'simple':
        return `[${lines.join(', ')}]`;
      case 'quoted':
        return `[\n  ${lines.map(line => `'${line.replace(/'/g, "\\'")}'`).join(',\n  ')}\n]`;
      case 'template':
        return `[\n  ${lines.map(line => `\`${line.replace(/`/g, '\\`')}\``).join(',\n  ')}\n]`;
      case 'markdown':
        return lines.map(line => {
          try {
            const url = new URL(line);
            return `- [${url.hostname}](${line})`;
          } catch {
            return `- ${line}`;
          }
        }).join('\n');
      default:
        return '[]';
    }
  };

  const handleCopy = async () => {
    const result = convertToArray(input, format);
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="mx-auto max-w-4xl">
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="flex gap-2 items-center text-2xl font-bold text-gray-800">
              <Link2 className="w-6 h-6 text-indigo-600" />
              Text Rows to JS Array Converter
            </h1>
            <div className="flex gap-3">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as ArrayFormat)}
                className="px-3 py-2 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="simple">Simple Array</option>
                <option value="quoted">Single Quotes</option>
                <option value="template">Template Literals</option>
                <option value="markdown">Markdown Links</option>
              </select>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  copied
                    ? 'text-green-700 bg-green-100'
                    : 'text-white bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <ClipboardCopy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Array'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Input URLs (one per line or comma-separated)
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter documentation URLs here..."
                className="w-full h-[400px] p-3 rounded-lg border border-gray-200 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {format === 'markdown' ? 'Markdown List' : 'JavaScript Array Output'}
              </label>
              <pre className="w-full h-[400px] p-3 rounded-lg bg-gray-50 border border-gray-200 font-mono text-sm overflow-auto">
                {convertToArray(input, format)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
