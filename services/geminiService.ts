
import { GoogleGenAI } from "@google/genai";

// FIX: Initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTutorExplanation = async (question: string, userAnswer: string, correctAnswer: string): Promise<string> => {
  const prompt = `
    Como un tutor experto en filosofía, por favor explica por qué la respuesta "${userAnswer}" es incorrecta para la pregunta "${question}", 
    y por qué "${correctAnswer}" es la respuesta correcta.
    Mantén la explicación concisa, clara y motivadora. La explicación debe estar en español.
    Enfócate en los conceptos clave.
  `;

  try {
    // FIX: Use ai.models.generateContent instead of deprecated methods.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    // FIX: Access the generated text directly from the 'text' property of the response.
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini:", error);
    return "Lo siento, no pude generar una explicación en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};
