import { callAnthropic } from "./anthropicCaller";
import { callGemini } from "./geminiCaller";
import { callOpenAi } from "./openaiCaller";

export type LLMRequest = {
  prompt: string;
  model: "openai" | "claude" | "gemini";
  temperature?: number;
  maxTokens?: number;
};

//test function
export async function callLLM(req: LLMRequest) {
  switch (req.model) {
    case "openai":
      return callOpenAi(req);
    case "claude":
      return callAnthropic(req);
    case "gemini":
      return callGemini(req);
    default:
      throw new Error(`Unsupported Model Provider : ${req.model}`);
  }
}
