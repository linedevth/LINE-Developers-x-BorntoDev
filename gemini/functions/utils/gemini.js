// Due to @google/generative-ai is deprecated, we will change it to @google/genai
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: `${process.env.API_KEY}` });

const context = require("./context");

class Gemini {
  async textOnly(prompt) {
    // Due to @google/generative-ai is deprecated, we will change it to @google/genai
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  }

  async textOnlyWithContext(prompt) {
    // Due to @google/generative-ai is deprecated, we will change it to @google/genai
    const parts = [{
      text: "ตอบคำถามโดยอ้างอิง Conference นี้เท่านั้น\n" + JSON.stringify(context.lct23_json)
    }];
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [prompt, ...parts],
    });
    return response.text;
  }

  async multimodal(prompt, base64Image) {
    // Due to @google/generative-ai is deprecated, we will change it to @google/genai
    const contents = [
      { inlineData: { data: base64Image, mimeType: "image/png" } },
      { text: `${prompt}` }
    ];
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents
    });
    return response.text;
  }

  async chat(cacheChatHistory, prompt) {
    // Due to @google/generative-ai is deprecated, we will change it to @google/genai
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: "ตอบคำถามเฉพาะที่เกี่ยวกับงาน Conference นี้เท่านั้น โดยคำตอบให้อ้างอิงข้อมูลอีเวนท์ของ CSV: ชื่อผู้บรรยาย, เวลา, หัวข้อ\n" + context.lct23_csv }]
      },
      {
        role: "model",
        parts: [{ text: "สวัสดีครับ ผมชื่อตี๋ ผมเป็นผู้จัดงาน LINE CONFERENCE THAILAND 2023 ครับ" }]
      }
    ];
    if (cacheChatHistory.length > 0) {
      chatHistory.push(...cacheChatHistory);
    }
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: chatHistory
    });
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  }
}

module.exports = new Gemini();