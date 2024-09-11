import {
  addEdge,
  applyEdgeChanges,
  Background,
  Connection,
  Edge,
  EdgeChange,
  Handle,
  NodeChange,
  Position,
  ReactFlow,
} from "@xyflow/react";
import Card from "./shared/Card";

import "@xyflow/react/dist/style.css";
import { useCallback, useMemo } from "react";
import { node } from "../types";

interface dataProps {
  data: {
    imageUrl: string;
    companyName: string;
    customSize?: string;
    position: "Bottom" | "Top";
  };
}

const nodeTypes = {
  cardNode: ({ data }: dataProps) => (
    <div className="react-flow__node-default rounded-lg border-2 border-[#898585] shadow-xl w-[160px] p-0 h-[140px]">
      <Card imageUrl={data.imageUrl} companyName={data.companyName} customSize={data.customSize} />

      <Handle type="source" position={Position[data.position]} />
      <Handle type="target" position={Position[data.position]} />
    </div>
  ),
};

interface DiagramProps {
  nodes: node[];
  setNodes: (nodes: node[]) => void;
  edges: Edge[]; // Use Edge type from React Flow
  setEdges: (edges: Edge[]) => void;
}

export default function Diagram({ nodes, setNodes, edges, setEdges }: DiagramProps) {
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
    },
    [edges, setEdges]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((node) => {
          const change = changes.find((c) => c.id === node.id);

          if (change && change.type === "position" && change.position) {
            const { x, y } = change.position;

            if (isNaN(x) || isNaN(y)) return node;

            return { ...node, position: { x, y } };
          }

          return node;
        });

        return updatedNodes;
      });
    },
    [setNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((prevEdges) => {
        return applyEdgeChanges(changes, prevEdges);
      });
    },
    [setEdges]
  );

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        nodeTypes={memoizedNodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
