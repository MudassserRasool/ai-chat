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
    <div className="flex flex-col h-screen   items-center overflow-hidden">
      {/* flex flex-col h-screen bg-gray-100 */}
      {/* Chat Area */}
      <div className="flex-1 w-full max-w-3xl overflow-y-auto p-4 space-y-8">
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
              } px-4 py-2 rounded-lg max-w-md shadow break-words`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-[#2F2F2F] shadow flex fixed bottom-2 rounded-xl w-[800px] p-3 gap-5">
        <input
          type="text"
          className="flex-1 bg-[#2F2F2F] text-white p-32  focus:outline-none focus:ring-0 border-none focus:border-none rounded-lg px-4 py-2 "
          placeholder=" Message your bussiness agent..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-white text-black px-6 w-20 h-10 py-2 ml-auto rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
