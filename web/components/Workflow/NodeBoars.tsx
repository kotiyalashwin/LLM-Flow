"use client";

import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
  type NodeTypes,
  Connection,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import WorkFlowNode from "./WorkFlowNode";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

import { Textarea } from "../ui/textarea";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCallback, useEffect, useState } from "react";

const nodeTypes: NodeTypes = {
  workFlowNode: WorkFlowNode,
};

interface WorkNodeData extends Record<string, unknown> {
  id: string;
  name: string;
  promptTemplate: string;
  model: string;
  dependsOn: string[] | [];
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function NodeBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeId, setNodeId] = useState(1);
  const [taskForm, setTaskForm] = useState<{
    name: string;
    model: string | "Gemini" | "Claude";
    promptTemplate: string;
  }>({
    name: "",
    model: "",
    promptTemplate: "",
  });

  const handleAddTask = useCallback(() => {
    if (!taskForm.name.trim()) return;

    const newNode: Node = {
      id: nodeId.toString(),
      type: "workFlowNode",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        id: nodeId.toString(),
        model: taskForm.model,
        promptTemplate: taskForm.promptTemplate,
        dependsOn: [],
      } as WorkNodeData,
    };
    setNodes((prev) => prev.concat(newNode));
    setNodeId((prev) => prev + 1);
    setTaskForm({ model: "", name: "", promptTemplate: "" });
    setIsModalOpen(false);
  }, [nodeId, setNodes, taskForm]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleFormChange = (field: string, value: string) => {
    setTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const changeDependency = useCallback(() => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        const nodeData = node.data as WorkNodeData;
        const incoming = edges.filter((edge) => (edge.target = node.id));

        //first incomig enge
        const dependency = incoming.length > 0 ? incoming[0] : null;
        let dependencyId: string | null = null;
        if (dependency) {
          const sourceNode = nodes.find(
            (node) => node.id === dependency.source
          );
          dependencyId = sourceNode ? sourceNode.id : null;
        }

        return {
          ...node,
          data: {
            ...nodeData,
            dependsOn: [dependencyId],
          } as WorkNodeData,
        };
      });
    });
  }, [edges, setNodes]);

  useEffect(() => {
    changeDependency();
    console.log(nodes);
  }, [edges, changeDependency]);

  return (
    <div className="relative " style={{ width: "100vw", height: "100vh" }}>
      <div className="absolute top-10 left-4 z-10">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className=" bg-purple-600 hover:bg-purple-800 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="border-none shadow-purple-500 shadow-sm bg-black md:bg-black/30   text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create New Worker
              </DialogTitle>
            </DialogHeader>
            <div className=" relative space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="task-name" className="text-gray-300">
                  Worker Name
                </Label>
                <Input
                  id="name"
                  placeholder="worker for..."
                  value={taskForm.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className=" outline-none border-none text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model-select" className="text-gray-300">
                  Powered By
                </Label>
                <Select
                  value={taskForm.model}
                  onValueChange={(value) => handleFormChange("model", value)}
                >
                  <SelectTrigger className=" text-white border-[1px]">
                    <SelectValue placeholder="AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-black">
                    <SelectItem value="gemini" className="text-white bg-black">
                      Gemini
                    </SelectItem>
                    <SelectItem value="claude" className="text-white bg-black">
                      Claude
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-gray-300">
                  Prompt Details
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Worker should ..."
                  value={taskForm.promptTemplate}
                  onChange={(e) =>
                    handleFormChange("promptTemplate", e.target.value)
                  }
                  className=" text-white placeholder:text-gray-400 min-h-[100px]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  onClick={handleAddTask}
                  disabled={!taskForm.name.trim()}
                  className="bg-purple-600 hover:bg-purple-800   text-white"
                >
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ReactFlow
        style={{ height: "90%" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        minZoom={0.8}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />

        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
