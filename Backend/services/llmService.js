const axios = require("axios");

async function getSummaryFromLLM(prompt) {
    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    };

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                data,
                { headers }
            );
            return response.data.choices[0].message.content;
        } catch (err) {
            if (err.response?.status === 429 && attempt < 3) {
                console.warn(`Rate limit hit. Retrying attempt ${attempt}...`);
                await new Promise(res => setTimeout(res, 1000 * attempt));
            } else {
                throw err;
            }
        }
    }
}


module.exports = {
    getSummaryFromLLM
}