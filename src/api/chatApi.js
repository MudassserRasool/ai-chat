import { OPEN_AI_API_KEY } from '../constants';
import apiRoutes from '../routes/apiRoutes';

const sendMessageToAssistant = async (messages, userMessage) => {
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
  if (data.error) {
    throw new Error(data.error.message);
  } else {
    return data;
  }
};

export { sendMessageToAssistant };
