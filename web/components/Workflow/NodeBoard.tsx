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
import axios from 'axios'
import { Textarea } from "../ui/textarea";
import {  Plus, Trash2 } from "lucide-react";
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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
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
        onDelete: () => initiateDelete(nodeId.toString()),
        id: nodeId.toString(),
        name: taskForm.name,
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



  const handleDeleteNode = useCallback(() => {
    if (!nodeToDelete) return;

    // Remove the node
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeToDelete));

    // Remove all edges connected to this node
    setEdges((edges) =>
      edges.filter(
        (edge) => edge.source !== nodeToDelete && edge.target !== nodeToDelete
      )
    );

    setDeleteConfirmOpen(false);
    setNodeToDelete(null);
  }, [nodeToDelete, setNodes, setEdges]);

  const getDeletePreview = useCallback(() => {
    if (!nodeToDelete) return null;

    const incomingEdges = edges.filter((edge) => edge.target === nodeToDelete);
    const outgoingEdges = edges.filter((edge) => edge.source === nodeToDelete);

    return {
      message: `This will delete the node and disconnect ${incomingEdges.length} parent connection(s) and ${outgoingEdges.length} child connection(s).`,
      parentCount: incomingEdges.length,
      childCount: outgoingEdges.length,
    };
  }, [nodeToDelete, edges]);

  const initiateDelete = useCallback((nodeId: string) => {
    setNodeToDelete(nodeId);
    setDeleteConfirmOpen(true);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length > 0) {
      initiateDelete(selectedNodes[0].id);
    } else {
      // If no node is selected, you could show a message or do nothing
      console.log("No node selected for deletion");
    }
  }, [nodes, initiateDelete]);

  const handleFormChange = (field: string, value: string) => {
    setTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const changeDependency = useCallback(() => {
    console.log("Previous Dependencies----->", nodes);
    console.log("changing dependency");
    setNodes((nodes) => {
      return nodes.map((node) => {
        const nodeData = node.data as WorkNodeData;
        const incoming = edges.filter((edge) => edge.target === node.id);

        if(incoming.length === 0){
          return node
        }

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
            promptTemplate : `By using data from {{${dependencyId}}}. ${nodeData.promptTemplate}`,
            dependsOn: [dependencyId],
            onDelete: () => initiateDelete(nodeId.toString()),
          } as WorkNodeData,
        };
      });
    });
  }, [edges, setNodes]);

  useEffect(() => {
    changeDependency();
  }, [edges]);

  const startWorkFlow = async()=>{
    const nodesData= nodes.map(node => (node.data))

    const {data , status } = await axios.post('http://localhost:8080/run', { tasks : nodesData})
    if(status != 200){
      console.error(data)
      return;
    }

    console.log({response : data})

  }

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
        <Button
          onClick={handleDeleteButtonClick}
          disabled={!nodes.some((node) => node.selected)}
          className="bg-red-600 ml-4 hover:bg-red-800 text-white shadow-lg"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Selected
        </Button>
        <Button
          onClick={startWorkFlow}
          disabled={nodes.length < 2}
          className=" text-white shadow-lg"
        >
          {/* <Trash2 className="w-4 h-4 mr-2" /> */}
          Start
        </Button>
      </div>

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="border-none shadow-red-500 shadow-sm bg-black md:bg-black/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {getDeletePreview() && (
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p className="text-yellow-400 mb-2">Warning:</p>
                <p>{getDeletePreview()?.message}</p>
                {((getDeletePreview()?.parentCount ?? 0) > 0 ||
                  (getDeletePreview()?.childCount ?? 0) > 0) && (
                  <p className="text-gray-400 mt-2">
                    Connected nodes will be disconnected but not deleted.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmOpen(false)}
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteNode}
                className="bg-red-600 hover:bg-red-800 text-white"
              >
                Delete Node
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
        deleteKeyCode={null}
      >
        <Controls />

        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
