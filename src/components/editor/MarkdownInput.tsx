import React, { useState } from 'react';
import { parseMarkdownToSlides } from '../../core/markdownParser';
import { type SlideData } from '../../types/elements'; // Corrected import for SlideData

interface MarkdownInputProps {
  onParse: (slidesData: SlideData[]) => void;
}

const MarkdownInput: React.FC<MarkdownInputProps> = ({ onParse }) => {
  const [markdownText, setMarkdownText] = useState<string>('');

  const handleGenerateSlides = () => {
    if (markdownText.trim() === '') {
      onParse([]);
      return;
    }
    const slides = parseMarkdownToSlides(markdownText);
    onParse(slides);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Importar desde Markdown</h3>
      <textarea
        value={markdownText}
        onChange={(e) => setMarkdownText(e.target.value)}
        placeholder="Pega tu Markdown aquí...\nUsa '---' en una línea nueva para separar diapositivas."
        rows={10}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
      <button
        onClick={handleGenerateSlides}
        className="mt-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Generar Diapositivas
      </button>
    </div>
  );
};

export default MarkdownInput;