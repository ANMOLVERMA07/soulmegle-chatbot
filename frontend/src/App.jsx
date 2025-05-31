import React from 'react'
import { ChatProvider } from './context/ChatContext.jsx';
import ChatInterface from './components/ChatInterface.jsx'

const App = () => {
  return (
    <ChatProvider>
      <div className="app">
        <ChatInterface />
      </div>
    </ChatProvider>
  )
}

export default App