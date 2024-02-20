const {onRequest} = require("firebase-functions/v2/https");
const utils = require("./utils");

// 1. npm install axios/openai

exports.webhook = onRequest(async (req, res) => {
    const events = req.body.events;
    for (const event of events) {
    
        // 2. Detect if message is text
        

            // 3. Create the logic to handle user's request (Text/Image)
            

            
                // 5. Call function that use OpenAI API to create image
                
                
            
                // 4. Call function that use OpenAI API to handle text

    }
    res.send(req.method);
});
