export type TaskInput = {
  id: string; // unique identifier
  provider: "openai" | "claude" | "gemini"; // which LLM to use
  promptTemplate: string; // e.g. "Summarize: {{input}}"
  dependsOn: string[]; // task IDs this depends on
};

export type RunWorkflowRequest = {
  tasks: TaskInput[];
  temperature?: number;
  maxTokens?: number;
};
