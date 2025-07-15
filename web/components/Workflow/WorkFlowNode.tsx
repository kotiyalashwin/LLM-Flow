"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Handle, Position } from "@xyflow/react";
import { GripVertical } from "lucide-react";
import { Input } from "../ui/input";

export default function WorkFlowNode({ data, id }: { data: any; id: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.name || "New Task");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    }
  };

  return (
    <Card className="w-72 bg-gray-800 border-gray-700 shadow-lg">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <GripVertical className="h-4 w-4 text-gray-400" />
          <div className="flex-1 ml-2">
            {isEditing ? (
              <Input
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleSubmit}
                onKeyDown={handleKeyPress}
                className="bg-gray-700 border-gray-600 text-white text-sm"
                autoFocus
              />
            ) : (
              <CardTitle
                className="text-white text-sm cursor-pointer hover:text-gray-300"
                onClick={() => setIsEditing(true)}
              >
                {title}
              </CardTitle>
            )}
          </div>
        </div>
        {data.model && (
          <div className="mt-2">
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                data.model === "gemini"
                  ? "bg-green-900 text-green-300 border border-green-700"
                  : "bg-purple-900 text-purple-300 border border-purple-700"
              }`}
            >
              {data.model.charAt(0).toUpperCase() + data.model.slice(1)}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {data.promptTemplate ? (
          <p className="text-gray-300 text-xs line-clamp-3">
            {data.promptTemplate}
          </p>
        ) : (
          <p className="text-gray-400 text-xs">No prompt details</p>
        )}
      </CardContent>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </Card>
  );
}
