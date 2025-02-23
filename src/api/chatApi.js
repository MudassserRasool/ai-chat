// import { OPEN_AI_API_KEY } from '../constants';
// import apiRoutes from '../routes/apiRoutes';

// const sendMessageToAssistant = async (messages, userMessage) => {
//   const response = await fetch(apiRoutes.CHAT_GPT, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${OPEN_AI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: 'deepseek-ai/deepseek-llm-67b-chat',
//       messages: [...messages, userMessage].map((message) => ({
//         role: message.sender,
//         content: message.text,
//       })),
//     }),
//   });
//   const data = await response.json();
//   if (data.error) {
//     throw new Error(data.error.message);
//   } else {
//     return data;
//   }
// };

// export { sendMessageToAssistant };

const BASE_URL = 'https://f72a-182-181-134-203.ngrok-free.app';

const sendMessageToAssistant = async (messages, userMessage) => {
  console.log(userMessage);
  console.log('----------------------messages------------------------');
  try {
    const response = await fetch(
      `https://f72a-182-181-134-203.ngrok-free.app/api/generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },

        body: JSON.stringify({
          model: 'granite3-dense:2b',
          prompt: userMessage.text,
          stream: false,
        }),
      }
    );

    console.log('----------------------response------------------------');
    console.log(response);
    console.log('----------------------response------------------------');

    const data = await response?.json();
    console.log(response, ' response');

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error fetching response');
    }

    return data.response || 'No response from AI.';
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to communicate with AI.');
  }
};

export { sendMessageToAssistant };
