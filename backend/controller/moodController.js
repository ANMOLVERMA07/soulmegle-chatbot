// Handle mood responses
export const getMoodResponse = (req, res) => {
  try {
    const { mood } = req.body;
    
    if (!mood) {
      return res.status(400).json({ 
        success: false,
        message: "Mood not selected" 
      });
    }

    const moodResponses = {
      Happy: "That's wonderful! Your happiness brightens my day too! 😊 Keep spreading joy!",
      Sad: "I'm here for you. It's completely okay to feel this way. 💙 Would you like to talk about what's bothering you?",
      Anxious: "Take a deep breath with me. Inhale... Exhale... 🧘‍♀️ Remember, this feeling is temporary. What's helping you cope?",
      Angry: "Your feelings are valid. 🔥 Let's work through this together. What triggered this anger?",
      Lonely: "You're more connected than you realize. 🤗 Would you like to join our community events this week?",
    };

    const reply = moodResponses[mood] || 
      "I'm here to listen. 💬 How can I support you today?";

    
    res.status(200).json({
        success: true,
        mood,
        message: reply
      });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};