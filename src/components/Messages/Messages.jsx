import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Messages = ({ messages, isLoading }) => {
  const messageVariants = {
    hidden: { opacity: 0, y: 20 }, // Start invisible and slightly below
    visible: { opacity: 1, y: 0 }, // Slide into place
  };

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className="flex-1 w-full max-w-3xl  p-4 space-y-8 mb-32">
      {messages.map((msg, index) => (
        <motion.div
          key={msg.id}
          initial="hidden"
          animate="visible"
          variants={messageVariants}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`flex ${
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`${
              msg.sender === 'user'
                ? 'bg-[#303030] text-white rounded-lg shadow'
                : ' text-white'
            } px-4 py-3 max-w-md break-words`}
          >
            {isLoading && msg.sender !== 'user' && index === messages.length - 1
              ? '...'
              : msg.text}
          </div>
        </motion.div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
