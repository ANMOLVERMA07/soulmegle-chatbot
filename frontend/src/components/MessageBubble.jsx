
const MessageBubble = ({ message }) => {
    if (!message?.text) {
        return <div className="text-red-500">Error: Message not found!</div>;
    }

    return (
        <div 
            className={`max-w-[80%] p-4 rounded-2xl relative animate-fadeIn  ${ 
                message.speaker === 'user' ? 'chat-bubble-user bg-gray-400' : 'chat-bubble-bot bg-blue-400'
            } ${message.isError ? 'bg-red-50 border-red-200' : ''}`}
        >
            <div className="mb-1">{message.text ? message.text : "Loading message..."}</div>
            <div className="text-xs font-semibold opacity-70 text-right">{message.timestamp}</div>
        </div>
    );
};

export default MessageBubble;