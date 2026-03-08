
import { GoogleGenAI, Type } from "@google/genai";
import { RULE_TAGS } from "../constants";
import { Priority, Category, Ticket, Sentiment, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const processTicketWithRules = (message: string) => {
  const lowerMessage = message.toLowerCase();
  const foundTags: string[] = [];
  let suggestedPriority = Priority.MEDIUM;

  Object.keys(RULE_TAGS).forEach(keyword => {
    if (lowerMessage.includes(keyword)) {
      foundTags.push(...RULE_TAGS[keyword]);
    }
  });

  if (lowerMessage.includes('urgent') || lowerMessage.includes('broken') || lowerMessage.includes('critical') || lowerMessage.includes('emergency')) {
    suggestedPriority = Priority.URGENT;
  } else if (lowerMessage.includes('refund') || lowerMessage.includes('billing')) {
    suggestedPriority = Priority.HIGH;
  }

  return {
    tags: Array.from(new Set(foundTags)),
    priority: suggestedPriority
  };
};

export const getAISuggestions = async (ticket: Partial<Ticket>) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this customer support ticket. 
      Identify:
      1. A professional suggested response.
      2. The primary category.
      3. A 1-sentence summary.
      4. Customer Sentiment: 'Positive', 'Neutral', 'Frustrated', or 'Critical'.
      5. Three keywords for internal knowledge base search.
      6. Detect the original language (e.g., 'en', 'es', 'fr').
      7. Provide a translation to English if it's not in English.

      Customer Name: ${ticket.customerName}
      Subject: ${ticket.subject}
      Message: ${ticket.message}
      
      Provide your response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedResponse: { type: Type.STRING },
            suggestedCategory: { type: Type.STRING },
            summary: { type: Type.STRING },
            sentiment: { type: Type.STRING },
            kbKeywords: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            detectedLanguage: { type: Type.STRING },
            translatedMessage: { type: Type.STRING }
          },
          required: ["suggestedResponse", "suggestedCategory", "summary", "sentiment", "detectedLanguage"]
        }
      }
    });

    const text = response.text || '{}';
    // Clean potential markdown blocks
    const cleanJson = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Service Error:", error);
    // If it's a JSON parse error because of HTML, we'll see it here
    if (error instanceof SyntaxError && (response?.text?.includes('<!DOCTYPE') || response?.text?.includes('<html'))) {
      console.error("Received HTML instead of JSON. This might be a network or proxy error.");
    }
    return null;
  }
};

export const translateResponse = async (text: string, targetLanguage: Language) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following customer support response to ${targetLanguage}. 
      Keep the tone professional and helpful.
      
      Text: ${text}`,
    });
    return response.text;
  } catch (error) {
    console.error("Translation Error:", error);
    return text;
  }
};
