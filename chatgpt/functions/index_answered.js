const {onRequest} = require("firebase-functions/v2/https");
const utils = require("./utils");

// 1. sudo npm install & create .env file

exports.webhook = onRequest(async (req, res) => {
    const events = req.body.events;
    for (const event of events) {
    
        // 2. Detect if message is text
        if (event.type === "message" && event.message.type === "text") {
            const prompt = event.message.text;
            let payload;

            // 3. Create the logic to handle user's request (Text/Image)
            if (prompt.includes('Image')) {
                const imagePrompt = prompt.split(':')[1];
                // 5. Call function that use OpenAI API to create image
                const response = await utils.openaiImageRequest(imagePrompt);
                payload = {
                    type: "image",
                    originalContentUrl: response,
                    previewImageUrl: response
                };
                
            } else {
                // 4. Call function that use OpenAI API to handle text
                const response = await utils.openaiTextRequest(prompt);
                payload = {
                    type: "text",
                    text: response,
                }
            }
            await utils.reply(event.replyToken, payload);
        }
    }
    res.send(req.method);
});
