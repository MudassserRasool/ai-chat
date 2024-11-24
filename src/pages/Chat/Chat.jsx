// src/components/Chat.js
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Messages from '../../components/Messages/Messages';
import { OPEN_AI_API_KEY } from '../../constants';
import apiRoutes from '../../routes/apiRoutes';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(apiRoutes.CHAT_GPT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage].map((message) => ({
            role: message.sender,
            content: message.text,
          })),
        }),
      });
      const data = await response.json();

      const assistantMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: data.choices[0].message.content,
      };
      setMessages([...messages, userMessage, assistantMessage]);
      setInput('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="flex flex-col h-screen   items-center overflow-auto overflow-x-hidden">
      <Header />

      <Messages messages={messages} isLoading={isLoading} />

      {/* Input Area */}
      <div className="bg-[#2F2F2F] shadow flex fixed bottom-0 rounded-xl w-[800px] p-3 gap-5">
        <textarea
          type="text"
          className="flex-1 bg-[#2F2F2F] text-white p-32  focus:outline-none resize-none focus:ring-0 border-none focus:border-none rounded-lg px-4 py-2 mx-h-32"
          placeholder=" Message your bussiness agent..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
        />
        <button
          className={`px-6 w-20 h-10 py-2 ml-auto rounded-lg shadow mt-auto focus:outline-none focus:ring ${
            input.trim() === ''
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-white text-black hover:bg-gray-300 focus:ring-gray-300'
          }`}
          onClick={handleSendMessage}
          disabled={input.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
