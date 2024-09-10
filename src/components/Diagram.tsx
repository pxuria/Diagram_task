import { addEdge, Background, Handle, Position, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import Card from "./shared/Card";

import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { initialNodes } from "../constants";

interface dataProps {
  data: {
    imageUrl: string;
    companyName: string;
    customSize?: string;
  };
}

const nodeTypes = {
  cardNode: ({ data }: dataProps) => (
    <div className="react-flow__node-default">
      <Card imageUrl={data.imageUrl} companyName={data.companyName} customSize={data.customSize} />

      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Top} />
    </div>
  ),
};

// Initial edges, starting with just one
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Diagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Limit each node to a single connection, irrespective of handle used
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        // Check if there's already an edge between source and target
        const existingEdge = eds.find(
          (edge) =>
            (edge.source === params.source && edge.target === params.target) ||
            (edge.source === params.target && edge.target === params.source)
        );

        // If no existing edge, add new edge
        if (!existingEdge) {
          return addEdge(params, eds);
        }

        // If there is already an edge, do nothing (return the existing edges)
        return eds;
      });
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
