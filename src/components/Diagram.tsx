import {
  applyEdgeChanges,
  Background,
  Connection,
  EdgeChange,
  Handle,
  NodeChange,
  Position,
  ReactFlow,
} from "@xyflow/react";
import Card from "./shared/Card";

import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { useDiagram } from "../store/useDiagram";

interface dataProps {
  data: {
    imageUrl: string;
    body: string;
    companyName: string;
    customSize?: string;
    position: "Bottom" | "Top";
  };
  id: string;
}

const nodeTypes = {
  cardNode: ({ data, id }: dataProps) => (
    <div className="react-flow__node-default rounded-lg border-2 border-[#898585] shadow-xl w-[160px] p-0 h-[180px]">
      <Card
        imageUrl={data.imageUrl}
        companyName={data.companyName}
        customSize={data.customSize}
        nodeId={id}
        body={data.body}
      />
      <Handle type="source" position={Position[data.position]} />
      <Handle type="target" position={Position[data.position]} />
    </div>
  ),
};

export default function Diagram() {
  const { nodes, setNodes, edges, setEdges } = useDiagram();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = { ...params, id: `e${params.source}-${params.target}-${Date.now()}` };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    },
    [setEdges]
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
      setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
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
