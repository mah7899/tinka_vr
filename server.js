// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
app.use(cors());


const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const question = req.body.question;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { messages: [{ role: 'user', content: question }], model: 'gpt-3.5-turbo' },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
