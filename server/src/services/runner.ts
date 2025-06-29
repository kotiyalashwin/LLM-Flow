import { TaskInput, RunWorkflowRequest } from "@common/index";
import Mustache from "mustache";
import { callLLM } from "../llm/llm";

type TaskResult = Record<string, string>;
type TaskMap = Record<string, TaskInput>;

export const runWorkFlow = async (payload: RunWorkflowRequest) => {
  const { inputs, tasks, temperature = 0.7, maxTokens = 1000 } = payload;
  const taskMap: TaskMap = Object.fromEntries(tasks.map((t) => [t.id, t]));
  const results: TaskResult = {};
  const visited = new Set<string>();

  const executeTask = async (taskId: string) => {
    //result already calculated
    if (results[taskId]) return results[taskId];

    const task = taskMap[taskId];

    if (!task) throw new Error(`Task: ${taskId} not found`);

    //execute task which curr task is dependent on
    for (const depId of task.dependsOn) {
      //check if visited this task
      if (!visited.has(depId)) {
        //call execute task recusively
        await executeTask(depId);
      }
    }

    //context for LLM(inputs + prev task results)
    const context = { ...inputs, ...results };

    //generate prompt for LLM
    const renderPrompt = Mustache.render(task.promptTemplate, context);

    //call LLM based on the model for each task
    const output = await callLLM({
      prompt: renderPrompt,
      model: task.provider,
      temperature,
      maxTokens,
    });

    console.log(output);
    //save result
    results[taskId] = output;

    visited.add(taskId);
    return output;
  };

  //all tasks
  for (const task of tasks) {
    await executeTask(task.id);
  }

  return results;
};
