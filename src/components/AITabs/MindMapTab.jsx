import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Maximize } from 'lucide-react';

const CustomNode = ({ data, isConnectable }) => {
  const colors = [
    'bg-[#FF9B9B]', // Reddish
    'bg-[#FFD6A5]', // Orange
    'bg-[#FDFFB6]', // Yellow
    'bg-[#CAFFBF]', // Green
    'bg-[#9BF6FF]', // Cyan
    'bg-[#A0C4FF]', // Blue
    'bg-[#BDB2FF]', // Purple
    'bg-[#FFC6FF]', // Pink
  ];
  const bgColor = colors[(data.depth || 1) % colors.length];
  
  return (
    <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full ${bgColor} shadow-lg border-2 border-black/10 text-gray-900 flex items-center justify-center text-center p-3 font-semibold text-xs md:text-sm break-words`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0" />
      {data.label}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0" />
    </div>
  );
};

const MainNode = ({ data, isConnectable }) => {
  return (
    <div className="px-8 py-5 rounded-[40px] shadow-xl bg-gray-200 border-4 border-gray-400/50 text-gray-900 min-w-[180px] max-w-[250px] text-center font-bold text-lg md:text-xl uppercase tracking-wider break-words">
      {data.label}
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
  main: MainNode,
};

export default function MindMapTab({ data, videoData }) {
  // Parse nested structure to React Flow nodes/edges
  const generateGraph = (rootData) => {
    const nodes = [];
    const edges = [];
    const centerX = 400;
    const centerY = 300;

    const traverse = (node, parentId = null, depth = 0, angle = 0, angleRange = Math.PI * 2) => {
      if (!node || !node.title) return null;
      
      const id = `node-${depth}-${Math.random().toString(36).substring(7)}`;
      
      let x = centerX;
      let y = centerY;
      
      if (depth > 0) {
        const radius = depth * 220; // Distance between levels
        x = centerX + radius * Math.cos(angle);
        y = centerY + radius * Math.sin(angle);
      }
      
      nodes.push({
        id,
        type: depth === 0 ? 'main' : 'custom',
        position: { x: x - 72, y: y - 72 }, // Centering the node
        data: { label: node.title, depth }
      });

      if (parentId) {
        edges.push({
          id: `e-${parentId}-${id}`,
          source: parentId,
          target: id,
          animated: true,
          style: { stroke: 'var(--color-text-primary)', strokeWidth: 2, opacity: 0.3 }
        });
      }

      if (node.children && Array.isArray(node.children) && node.children.length > 0) {
        const numChildren = node.children.length;
        const slice = angleRange / numChildren;
        let currentAngle = angle - (angleRange / 2) + (slice / 2);
        
        node.children.forEach((child) => {
          traverse(child, id, depth + 1, currentAngle, slice);
          currentAngle += slice;
        });
      }
      
      return id;
    };

    if (rootData && rootData.title) {
      traverse(rootData);
    } else {
      nodes.push({ id: '1', type: 'main', position: { x: 250, y: 50 }, data: { label: videoData?.title || 'Video Topic' } });
    }

    return { nodes, edges };
  };

  const graphData = generateGraph(data);
  const mapNodes = graphData.nodes;
  const mapEdges = graphData.edges;

  const [nodes, setNodes, onNodesChange] = useNodesState(mapNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(mapEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="w-full h-[500px] rounded-none overflow-hidden relative border border-[var(--color-glass-border)] bg-[var(--color-bg-primary)]">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h2 className="text-xl font-semibold m-0 font-serif text-[var(--color-text-primary)]">Knowledge Graph</h2>
        <p className="text-xs text-[var(--color-text-secondary)]">Interactive map of core concepts.</p>
      </div>
      
      <button className="absolute top-4 right-4 z-10 p-2 glass-card hover:bg-white/10 transition-colors rounded-lg">
        <Maximize className="w-4 h-4 text-white" />
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="touch-none"
        minZoom={0.5}
        maxZoom={2}
      >
        <Background color="var(--color-accent-gold)" gap={24} size={1} variant="dots" opacity={0.15} />
        <Controls 
          className="!bg-[rgba(17,24,39,0.8)] !border-white/10 !rounded-xl !overflow-hidden fill-white"
          showInteractive={false}
        />
      </ReactFlow>
      
      <style jsx global>{`
        .react-flow__controls-button {
          background: transparent !important;
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
        }
        .react-flow__controls-button:hover {
          background: rgba(255,255,255,0.1) !important;
        }
        .react-flow__controls-button svg {
          fill: white !important;
        }
      `}</style>
    </div>
  );
}
