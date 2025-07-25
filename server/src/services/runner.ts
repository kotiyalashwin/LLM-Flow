import { TaskInput, RunWorkflowRequest } from "../types/index";
import Mustache from "mustache";
import { callLLM } from "../llm/llm";
import WebSocket from "ws";

type TaskResult = Record<string, string>;
type TaskMap = Record<string, TaskInput>;

export const runWorkFlow = async (payload: RunWorkflowRequest , ws : WebSocket) => {
  const { tasks, temperature = 0.7, maxTokens = 8000 } = payload;
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
     if(depId){
       if (!visited.has(depId)) {
        //call execute task recusively
        await executeTask(depId);
      }
     }
    }
  

    //context for LLM(inputs + prev task results)
    const context = { ...results };

    //generate prompt for LLM
    const renderPrompt = Mustache.render(task.promptTemplate, context);
    //call LLM based on the model for each task
    const output = await callLLM({
      prompt:  renderPrompt,
      model: task.model,
      temperature,
      maxTokens,
    });

    // console.log(output);
    results[taskId] = output;
    ws.send(JSON.stringify({id : task.id , processing : false}))

    visited.add(taskId);
    return output;
  };

  //all tasks
  for (const task of tasks) {
    ws.send(JSON.stringify({id : task.id , processing : true}))
    await executeTask(task.id);
  }

  return results;
};
