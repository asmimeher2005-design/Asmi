
import { GoogleGenAI, Type } from "@google/genai";
import { DailyLog, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPCOSInsights = async (logs: DailyLog[], profile: UserProfile) => {
  const recentLogs = logs.slice(-7); // Last week
  const prompt = `
    Context: PCOS Support Assistant. 
    User Profile: ${JSON.stringify(profile)}
    Recent Health Data (last 7 days): ${JSON.stringify(recentLogs)}
    
    Task: Provide 3 highly personalized, empathetic, and science-backed health insights for managing PCOS symptoms based on the user's data. 
    Focus on nutrition, lifestyle, or supplement suggestions (disclaiming that this is not medical advice).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  category: { type: Type.STRING, description: 'Lifestyle, Nutrition, or Mindset' }
                },
                required: ['title', 'description', 'category']
              }
            },
            summary: { type: Type.STRING, description: 'A short encouraging message' }
          },
          required: ['insights', 'summary']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
};

export const chatWithCia = async (message: string, logs: DailyLog[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are Cia, a specialized PCOS wellness assistant. You are empathetic, knowledgeable about hormonal health, and focus on holistic wellness. Always remind the user to consult with a doctor for medical issues.",
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
