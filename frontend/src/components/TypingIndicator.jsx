// src/components/TypingIndicator.jsx
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center p-3 bg-white border border-gray-200 rounded-2xl self-start max-w-[150px]">
      <span className="text-gray-600 text-sm">Soul is typing</span>
      <div className="flex ml-2">
        {[...Array(3)].map((_, i) => (
          <span 
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full mx-[2px] animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;