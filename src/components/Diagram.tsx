import { addEdge, Background, Handle, Position, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import Card from "./shared/Card";

import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { initialEdges, initialNodes } from "../constants";

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

export default function Diagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Limit each node to a single connection, irrespective of handle used
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const existingEdge = eds.find(
          (edge) =>
            (edge.source === params.source && edge.target === params.target) ||
            (edge.source === params.target && edge.target === params.source)
        );
        if (!existingEdge) {
          return addEdge(params, eds);
        }
        return eds;
      });
    },
    [setEdges]
  );

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
