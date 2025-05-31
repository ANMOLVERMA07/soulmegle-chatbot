import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    // Mood data with colors and emojis
  const moods = [
    { name: 'Happy', emoji: '😊', color: '#4CAF50' },
    { name: 'Sad', emoji: '😢', color: '#2196F3' },
    { name: 'Anxious', emoji: '😰', color: '#FF9800' },
    { name: 'Angry', emoji: '😠', color: '#F44336' },
    { name: 'Lonely', emoji: '😔', color: '#9C27B0' }
  ];

    // const [message,setMessage] = useState(null);
    const [selectedMood, setSelectedMood] = useState("");
    const [conversation,setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
      if (!selectedMood) return;

        axios.post("https://soulmegle-chatbot-backend.onrender.com/api/response",{mood : selectedMood.name})
            .then((response) => {
                setMessage(response.data.message);
                setSelectedMood(response.data.mood);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [selectedMood]);

    // Handle API submission
  const handleSubmit = async () => {
    console.log("Submitting mood:", selectedMood);

   if (!selectedMood) {
        setError("Please select a mood first");
        return;
    }

    
    setIsLoading(true);
    setError(null);
    
    
    
    try {
      const response = await axios.post("https://soulmegle-chatbot-backend.onrender.com/api/response", { mood: selectedMood.name });
      console.log("Received API response:", response.data);

      await new Promise(resolve => setTimeout(resolve, 800));
      
      setConversation(prev => [
        ...prev, 
        { 
          id: Date.now() + 1,
          speaker: 'bot', 
          text: response.data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase()
        }
      ]);

      console.log("Updated conversation:", conversation);

      
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error("Error in API request:", error);
      setConversation(prev => [
        ...prev, 
        { 
          id: Date.now() + 1,
          speaker: 'bot', 
          text: "Oops! Something went wrong. 😅 Please try again.",
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
      setSelectedMood(null);
    }
}


    // Handle mood selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setError(null);
    
    // Add user message to conversation
    setConversation(prev => [
      ...prev, 
      { 
        id: Date.now(),
        speaker: 'user', 
        text: `I'm feeling ${mood.name.toLowerCase()}`, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase()
      }
    ]);
  };


  useEffect(() => {
    console.log("Conversation Updated:", conversation);
}, [conversation]);


    // Reset conversation
  const handleReset = () => {
    setConversation([]);
    setSelectedMood(null);
    setError(null);
  };

    return (
        <ChatContext.Provider value={{ moods,selectedMood,conversation,isLoading,error,handleMoodSelect,handleSubmit,handleReset }}>
            {children}
        </ChatContext.Provider>
    );
};