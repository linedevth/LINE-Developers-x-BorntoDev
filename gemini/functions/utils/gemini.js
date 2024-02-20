const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const context = require("./context");

class Gemini {
  async textOnly(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async textOnlyWithContext(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const parts = [{
        text: "ตอบคำถามโดยอ้างอิง Conference นี้เท่านั้น\n" + JSON.stringify(context.lct23_json)
    }];
    const result = await model.generateContent([prompt, ...parts]);
    return result.response.text();
  }

  async multimodal(prompt, base64Image) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const mimeType = "image/png";
    const imageParts = [{
      inlineData: { data: base64Image, mimeType }
    }];
    const result = await model.generateContent([prompt, ...imageParts]);
    return result.response.text();
  }

  async chat(cacheChatHistory, prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chatHistory = [
      {
        role: "user",
        parts: "ตอบคำถามเฉพาะที่เกี่ยวกับงาน Conference นี้เท่านั้น โดยคำตอบให้อ้างอิงข้อมูลอีเวนท์ของ CSV: ชื่อผู้บรรยาย, เวลา, หัวข้อ\n" + context.lct23_csv
      },
      {
        role: "model",
        parts: "สวัสดีครับ ผมชื่อตี๋ ผมเป็นผู้จัดงาน LINE CONFERENCE THAILAND 2023 ครับ"
      }
    ];
    if (cacheChatHistory.length > 0) {
      chatHistory.push(...cacheChatHistory);
    }
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }
}

module.exports = new Gemini();