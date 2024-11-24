// src/components/Chat.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { sendMessageToAssistant } from '../../api/chatApi';
import Header from '../../components/Header/Header';
import ChatInput from '../../components/Inputs/ChatInput/ChatInput';
import Messages from '../../components/Messages/Messages';
import StarterMessage from '../../components/Messages/StarterMessage';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
    };
    setIsLoading(true);
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const data = await sendMessageToAssistant(messages, userMessage);
      const assistantMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: data.choices[0].message.content,
      };
      setMessages([...messages, userMessage, assistantMessage]);
      setInput('');
    } catch (error) {
      toast.error('An error occurred. Please try again later.', error);
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

      {messages.length === 0 ? (
        <StarterMessage />
      ) : (
        <Messages messages={messages} isLoading={isLoading} />
      )}

      <ChatInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Chat;
