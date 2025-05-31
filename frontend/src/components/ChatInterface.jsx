// src/components/ChatInterface.jsx
import React, { useRef, useEffect, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import MoodSelector from './MoodSelector';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatInterface = () => {
  const { moods,conversation,isLoading,handleReset } = useContext(ChatContext);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isLoading]);
  return (
    <div className="flex flex-col h-[95vh] mt-4 mb-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <header className="flex justify-between border-black border-b items-center px-6 py-4 bg-gradient-soul text-white">
        <div>
          <h1 className="text-2xl font-bold text-black">Soul<span className='text-blue-500'>megle</span> Chatbot</h1>
          <p className="opacity-90 text-black">Your emotional support companion</p>
        </div>
        {conversation.length > 0 && (
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-blue-400 border font-semibold text-white cursor-pointer rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Over
          </button>
        )}
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50 flex flex-col gap-4">
          {conversation.length === 0 ? (
            <div className="text-center py-10 text-gray-600">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Welcome to Soulmegle</h2>
              <p className="mb-8">Select how you're feeling to start a conversation</p>
              <div className="flex justify-center gap-6">
                {moods.map(mood => (
                  <div key={mood.name} className="text-4xl">
                    {mood.emoji}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            conversation.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}

          {isLoading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Mood Selector */}
      <MoodSelector />
      
      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 border-t">
        <p>Made with ❤️ for Soul<span className='text-blue-500'>megle</span></p>
      </footer>
    </div>
  );
};

export default ChatInterface;