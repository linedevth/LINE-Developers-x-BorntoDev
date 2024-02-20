const axios = require("axios");
const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}` 
};
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: `${process.env.OPEN_AI_API_KEY}`
  });

const openaiTextRequest = async (message) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ 
            role: "user",
            content: message, 
        }],
      });
    console.log(JSON.stringify(completion));
    return completion.choices[0].message.content;
}

const openaiImageRequest = async (message) => {
    const image = await openai.images.generate({ 
        model: "dall-e-3", 
        prompt: message
    });
    console.log(JSON.stringify(image));
    return image.data[0].url;
}

const reply = async (replyToken, payload) => {
    await axios({
        method: "post",
        url: `${LINE_MESSAGING_API}/message/reply`,
        headers: LINE_HEADER,
        data: JSON.stringify({
            replyToken: replyToken,
            messages: [payload]
        })
    });
};

module.exports = { openaiTextRequest, openaiImageRequest, reply };