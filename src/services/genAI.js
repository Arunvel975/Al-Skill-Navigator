// api/generateText.js
import { OpenAIApi } from 'openai';

const openai = new OpenAIApi({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    });
    const text = response.data.choices[0].text.trim();
    res.status(200).json({ text });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ message: 'Error generating text' });
  }
}