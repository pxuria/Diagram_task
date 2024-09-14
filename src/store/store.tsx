import { Edge, Node } from "@xyflow/react";
import { createContext, useState } from "react";
import { initialEdges, initialNodes } from "../constants";
import { node, nodeData } from "../types";

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

  const addNewNode = (newNodeData: { companyName: string; imageUrl: string; body: string }) => {
    const newNodeId = `${Date.now()}`;

    const lastNode = nodes.reduce((prev, curr) => (prev.position.x > curr.position.x ? prev : curr), nodes[0]);
    const newX = lastNode ? lastNode.position.x + 200 : 0;
    const newNodePosition = { x: newX, y: 250 };

    const nodeToAdd: node = {
      id: newNodeId,
      type: "cardNode",
      position: newNodePosition,
      data: {
        companyName: newNodeData.companyName,
        body: newNodeData.body,
        imageUrl: newNodeData.imageUrl,
        position: "Top",
      },
    };

    setNodes((prevNodes) => [...prevNodes, nodeToAdd]);

    const newEdgeId = `e1-${newNodeId}`;
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
