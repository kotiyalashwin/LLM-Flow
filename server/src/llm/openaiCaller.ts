import { LLMRequest } from "./llm";

import OpenAI from "openai";
const my_api_key = process.env.OPENAI_KEY;

export const callOpenAi = async (req: LLMRequest): Promise<string> => {
  // console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

  const openai = new OpenAI({
    apiKey: my_api_key,
    timeout: 1200000,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [{ role: "user", content: req.prompt }],
    temperature: req.temperature,
    max_tokens: req.maxTokens,
  });

  return response.choices[0]?.message?.content ?? "";
};
