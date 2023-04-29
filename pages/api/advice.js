// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Configuration, OpenAIApi } = require('openai');

const OPEN_AI_API_KEY = process.env.OPENAI_APIKEY;
const configuration = new Configuration({
  apiKey: OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  const { prompt, stop } = req.body;
  try {
    const { data } = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.9,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting weather advice');
  }
}
