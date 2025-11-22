import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateEbookContent = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    throw new Error("Failed to generate content: " + error.message);
  }
};
