import { GoogleGenAI, Type } from "@google/genai";
import { TransmissionResponse } from '../types';

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchRetroTransmission = async (timeContext: string): Promise<TransmissionResponse> => {
  const ai = getClient();
  
  const prompt = `
    The current time is ${timeContext}.
    You are a mysterious radio transmitter from a retro-futuristic parallel universe (Cyberpunk 1980s, Steampunk, or Synthwave aesthetic).
    Broadcast a short, cryptic, or atmospheric message to the user. 
    It could be a weather report from Mars, a traffic update for flying cars, a philosophical musing on time, or a snippet of code from the Matrix.
    Keep it under 40 words.
    Also, invent a cool "Frequency" (e.g., "104.5 FM - Neo Tokyo", "Subspace Channel 7").
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING },
            frequency: { type: Type.STRING },
            timestamp: { type: Type.STRING, description: "The current fictional timestamp of the sender" }
          },
          required: ["message", "frequency", "timestamp"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No signal received.");
    
    return JSON.parse(text) as TransmissionResponse;
  } catch (error) {
    console.error("Transmission failed:", error);
    return {
      message: "SIGNAL LOST. STATIC INTERFERENCE DETECTED.",
      frequency: "ERR-404",
      timestamp: "UNKNOWN"
    };
  }
};