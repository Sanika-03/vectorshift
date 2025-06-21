// src/nodes/LLMNode.js
import React, { useState } from 'react';
import BaseNode from '../components/baseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'llm');
  
  return (
    <BaseNode 
      title="LLM" 
      id={id}
      inputs={[
        { 
          id: `${id}-system`, 
          label: "System",
          position: Position.Left,
          style: { top: '15%' } 
        },
        { 
          id: `${id}-prompt`, 
          label: "Prompt",
          position: Position.Left,
          style: { top: '85%' } 
        }
      ]}
      outputs={[
        { 
          id: `${id}-response`, 
          label: "Response",
          position: Position.Right,
          style: { top: '50%' } 
        }
      ]}
    >
      <div>
        <div>
        <span>This is a LLM.</span>
      </div>
        
      </div>
    </BaseNode>
  );
};