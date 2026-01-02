
import { GoogleGenAI, Type } from "@google/genai";
import { EmotionType, ObjectShape } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getObjectThought = async (shape: ObjectShape, emotion: EmotionType, intensity: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a personified ${shape} that is feeling ${emotion} with an intensity of ${intensity}%. 
      Provide a very short, poetic, 1-sentence inner thought that makes a human feel empathy or connection with you. 
      Do not use emojis. Use first-person perspective ("I..."). Keep it under 15 words.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text.trim() || "I'm just a shape, but I feel something...";
  } catch (error) {
    console.error("Error fetching Gemini thought:", error);
    return "I feel... distinctly geometric today.";
  }
};
