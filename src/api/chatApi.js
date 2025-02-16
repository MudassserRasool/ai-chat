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

import { OPEN_AI_API_KEY } from '../constants';

const BASE_URL = 'https://api.aimlapi.com/v1';

const sendMessageToAssistant = async (messages, userMessage) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-llm-67b-chat',
        messages: [...messages, userMessage].map((message) => ({
          role: message.sender,
          content: message.text,
        })),
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log(response, ' response');

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error fetching response');
    }

    return data.choices[0]?.message?.content || 'No response from AI.';
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to communicate with AI.');
  }
};

export { sendMessageToAssistant };
