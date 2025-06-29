type LLMRequest = {
  prompt: string;
  model: "openai" | "claude" | "gemini";
  temperature?: number;
  maxTokens?: number;
};

//test function
export async function callLLM(req: LLMRequest): Promise<string> {
  const { prompt, model } = req;

  console.log(`📡 Calling ${model} with prompt:\n${prompt}\n`);
  return `Response from ${model} for prompt: "${prompt.slice(0, 60)}..."`;
}
