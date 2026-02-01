import React, { useState, useCallback } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ORG_NODES, ORG_EDGES } from '../data/mockData';
import { Share2, GitMerge } from 'lucide-react';

const nodeStyle = {
    background: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
    fontSize: '12px',
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter, sans-serif',
    width: 180,
    textAlign: 'center'
};

const initialNodes = ORG_NODES.map(n => ({
    ...n,
    style: nodeStyle
}));

export default function InkTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(ORG_EDGES);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const simulateMerge = () => {
    // Add two new nodes
    const newNode1 = { id: 'm1', data: { label: 'Merge Candidate A' }, position: { x: 600, y: 0 }, style: { ...nodeStyle, border: '1px solid #ec4899', color: '#be185d' } };
    const newNode2 = { id: 'm2', data: { label: 'Merge Candidate B' }, position: { x: 800, y: 0 }, style: { ...nodeStyle, border: '1px solid #ec4899', color: '#be185d' } };

    setNodes((nds) => [...nds, newNode1, newNode2]);

    // Animate them moving and connecting
    setTimeout(() => {
        setNodes((nds) => nds.map(n => {
            if (n.id === 'm1') return { ...n, position: { x: 600, y: 100 } };
            if (n.id === 'm2') return { ...n, position: { x: 800, y: 100 } };
            return n;
        }));

        setTimeout(() => {
             const newEdges = [
                 { id: 'em1', source: 'root', target: 'm1', animated: true, style: { stroke: '#ec4899' } },
                 { id: 'em2', source: 'root', target: 'm2', animated: true, style: { stroke: '#ec4899' } }
             ];
             setEdges((eds) => [...eds, ...newEdges]);
        }, 600);
    }, 100);
  };

  return (
    <div className="h-[calc(100vh-100px)] bg-slate-50 relative rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-slate-100">
         <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            InkTree
         </h1>
         <p className="text-xs text-slate-500 mt-1">Organizational Structure Visualization</p>
      </div>

      <div className="absolute top-4 right-4 z-10">
          <button
            onClick={simulateMerge}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
              <GitMerge className="w-4 h-4" />
              Simulate Merge
          </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls className="bg-white border border-slate-200 shadow-sm rounded-lg" />
      </ReactFlow>
    </div>
  );
}
