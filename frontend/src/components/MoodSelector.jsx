// src/components/MoodSelector.jsx
import React,{useContext} from 'react';
import { ChatContext } from '../context/ChatContext';

const MoodSelector = () => {
  const { 
    moods, 
    selectedMood, 
    error, 
    isLoading,
    handleMoodSelect, 
    handleSubmit 
  } = useContext(ChatContext);

  return (
    <div className="p-5 bg-white border-t">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">How are you feeling today?</h3>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {moods.map(mood => (
          <button
            key={mood.name}
            className={`flex items-center gap-2 px-4 py-2 border-2 rounded-full font-semibold transition-all ${
              selectedMood?.name === mood.name 
                ? 'text-black' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedMood?.name === mood.name ? mood.color : '',
              borderColor: mood.color
            }}
            onClick={() => handleMoodSelect(mood)}
            disabled={isLoading}
          >
            <span className="text-xl">{mood.emoji}</span>
            {mood.name}
          </button>
        ))}
      </div>
      
      <button 
        className={`w-full py-3 px-4 rounded-full text-white cursor-pointer font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
          (!selectedMood || isLoading) 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-700 hover:from-green-500 hover:to-green-700 hover:shadow-lg'
        }`}
        onClick={() => {
            handleSubmit();
        }}
        disabled={!selectedMood || isLoading}
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin text-black"></span>
            Soul is responding...
          </>
        ) : (
          'Talk to Soul'
        )}
      </button>
    </div>
  );
};

export default MoodSelector;