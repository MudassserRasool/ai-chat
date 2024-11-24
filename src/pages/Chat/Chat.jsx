// src/components/Chat.js
import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    };
    const botMessage = {
      id: messages.length + 2,
      sender: 'bot',
      text: 'This is a dummy response to your message.',
    };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen w-[50%] mx-auto items-center">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              } px-4 py-2 rounded-lg max-w-xs shadow`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-[#2F2F2F] shadow  flex   fixed bottom-2 ">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 ml-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
