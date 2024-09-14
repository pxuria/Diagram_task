import { Edge, Node } from "@xyflow/react";
import { createContext, useState } from "react";
import { initialEdges, initialNodes } from "../constants";
import { nodeData } from "../types";

interface DiagramContextType {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  addNewNode: (newNodeData: nodeData) => void;
  deleteNode: (nodeId: string) => void;
}

export const DiagramContext = createContext<DiagramContextType | undefined>(undefined);

const DiagramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const addNewNode = (newNodeData: { companyName: string; imageUrl: string }) => {
    const newNodeId = `${Date.now()}`; // Use the current timestamp as a unique ID
    const newNodePosition = { x: Math.random() * 400, y: Math.random() * 400 };

    const nodeToAdd: Node = {
      id: newNodeId,
      type: "cardNode",
      position: newNodePosition,
      data: {
        companyName: newNodeData.companyName,
        imageUrl: newNodeData.imageUrl,
        position: "Top",
      },
    };

    setNodes((prevNodes) => [...prevNodes, nodeToAdd]);

    // Add an edge between the new node and the first node (id: "1")
    const newEdgeId = `e1-${newNodeId}`; // Ensure unique edge ID
    setEdges((prevEdges) => [...prevEdges, { id: newEdgeId, source: "1", target: newNodeId }]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    setEdges((prev) => prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  return (
    <DiagramContext.Provider value={{ nodes, setNodes, edges, setEdges, addNewNode, deleteNode }}>
      {children}
    </DiagramContext.Provider>
  );
};

export default DiagramProvider;
