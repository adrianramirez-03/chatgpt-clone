const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
  organization: 'org-d1Rvx0f3AsjDlNSRvg8DNK7G',
  apiKey: `${process.env.OPENAI_SECURE_KEY}`,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post('/', async (req, res) => {
  const { message } = req.body;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `${message}`,
      },
    ],
    max_tokens: 256,
    temperature: 0.7,
  });

  res.json({
    message: response.data.choices[0].message.content,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
