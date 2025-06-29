import { LLMRequest } from "./llm";

import Anthropic from "@anthropic-ai/sdk";

export const callAnthropic = async (req: LLMRequest): Promise<string> => {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
  });
  const response = await anthropic.messages.create({
    model: "claude-opus-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: req.prompt }],
  });

  const firstTextPart = response.content.find((part) => part.type === "text");

  if (firstTextPart && "text" in firstTextPart) {
    return firstTextPart.text;
  }

  return "[claude]: No text response";
};
