import { GoogleGenerativeAI } from "@google/generative-ai";
import { LLMRequest } from "./llm";

export const callGemini = async (req: LLMRequest): Promise<string> => {
  const gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

  const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(req.prompt);
  const response = result.response;
  return response.text();
};
