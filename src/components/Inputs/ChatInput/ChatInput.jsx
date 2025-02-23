import PropTypes from 'prop-types';
import React from 'react';

const ChatInput = ({
  input,
  setInput,
  handleSendMessage,
  isLoading,
  handleKeyDown,
}) => {
  return (
    <div className="bg-[#2F2F2F] shadow flex fixed bottom-0 rounded-xl w-[800px] p-3 gap-5">
      <textarea
        type="text"
        className="flex-1 bg-[#2F2F2F] text-white p-32  focus:outline-none resize-none focus:ring-0 border-none focus:border-none rounded-lg px-4 py-2 mx-h-32"
        placeholder=" Message your educational agent..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
      />
      <button
        className={`px-6 w-20 h-10 py-2 ml-auto rounded-lg shadow mt-auto focus:outline-none focus:ring ${
          input.trim() === '' || isLoading
            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
            : 'bg-white text-black hover:bg-gray-300 focus:ring-gray-300'
        }`}
        onClick={handleSendMessage}
        disabled={input.trim() === '' || isLoading}
      >
        Send
      </button>
    </div>
  );
};
ChatInput.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  handleKeyDown: PropTypes.func,
};

export default ChatInput;
