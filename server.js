const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON body

app.post('/api/chat', async (req, res) => {
    try {
        const { question } = req.body;
        const openaiUrl = "https://api.openai.com/v1/chat/completions";
        
        const openaiResponse = await axios.post(openaiUrl, {
            messages: [{ role: "user", content: question }],
            temperature: 0.5,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            model: "gpt-3.5-turbo"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        const answer = openaiResponse.data.choices[0].message.content;
        res.json({ answer });
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
