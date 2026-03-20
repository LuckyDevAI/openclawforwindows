import { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from './WorkflowNode';

let nodeId = 0;
const getId = () => `node_${++nodeId}`;

interface Props {
  onNodeSelect: (node: Node | null) => void;
  selectedNodeId: string | null;
  onNodesUpdate?: (nodes: Node[]) => void;
}

export default function WorkflowCanvas({ onNodeSelect, selectedNodeId, onNodesUpdate }: Props) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/reactflow');
      if (!raw || !reactFlowInstance) return;

      const { nodeType, data } = JSON.parse(raw);
      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: nodeType,
        position,
        data,
      };

      setNodes(nds => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    onNodeSelect(node);
  }, [onNodeSelect]);

  const handlePaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  // Update node data from properties panel
  const updateNodeData = useCallback((nodeId: string, newData: Record<string, unknown>) => {
    setNodes(nds =>
      nds.map(n => (n.id === nodeId ? { ...n, data: newData } : n))
    );
  }, [setNodes]);

  // Expose updateNodeData via ref-like pattern through parent
  // We use a simpler approach: pass nodes up when they change
  if (onNodesUpdate) {
    // This is handled via the exposed updateNodeData
  }

  return {
    element: (
      <div ref={reactFlowWrapper} className="h-full w-full">
        <ReactFlow
          nodes={nodes.map(n => ({ ...n, selected: n.id === selectedNodeId }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{ animated: true, type: 'smoothstep' }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(225 10% 20%)" />
          <Controls />
          <MiniMap
            nodeStrokeWidth={3}
            pannable
            zoomable
            style={{ height: 100, width: 140 }}
          />
        </ReactFlow>
      </div>
    ),
    updateNodeData,
    nodes,
  };
}
