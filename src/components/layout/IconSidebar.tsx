import React from 'react';

// A simple SVG icon placeholder (e.g., a square)
const PlaceholderIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`w-6 h-6 text-gray-400 group-hover:text-white ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7" // Simple lines icon
    ></path>
  </svg>
);


const IconSidebar: React.FC = () => {
  return (
    <div className="w-16 bg-gray-900 text-white p-3 flex flex-col items-center space-y-6">
      {/* Icon for the app or brand - optional */}
      <div className="my-2">
        <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3.5a1.5 1.5 0 011.395 2.265l-4.146 7.255a1.5 1.5 0 01-2.79-.001L.605 5.765A1.5 1.5 0 012 3.5h8zm5.594 1.803a1.5 1.5 0 00-2.413-1.025L10 7.182l-1.182-2.904a1.5 1.5 0 00-2.79-.001L.605 11.022a1.5 1.5 0 002.413 1.025L10 9.142l4.182 2.904a1.5 1.5 0 002.79.001l3.854-6.745a1.5 1.5 0 00-1.151-2.524z"></path>
        </svg>
      </div>

      <button className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700 group w-full flex flex-col items-center">
        <PlaceholderIcon />
        <span className="text-xs mt-1 group-hover:text-white text-gray-400">Diseño</span>
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700 group w-full flex flex-col items-center">
        <PlaceholderIcon />
        <span className="text-xs mt-1 group-hover:text-white text-gray-400">Elementos</span>
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700 group w-full flex flex-col items-center">
        <PlaceholderIcon />
        <span className="text-xs mt-1 group-hover:text-white text-gray-400">Texto</span>
      </button>
      {/* Add more icons/buttons as needed */}
    </div>
  );
};

export default IconSidebar;