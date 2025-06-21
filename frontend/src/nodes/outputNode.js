// src/nodes/OutputNode.js
import React, { useState } from 'react';
import BaseNode from '../components/baseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode 
      title="Output" 
      id={id}
      headerColor="bg-red-600"
      inputs={[
        { 
          id: `${id}-value`,
          position: Position.Left,
          style: { top: '50%' }
        }
      ]}
      minWidth={200}
      minHeight={80}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label>Type</label>
        <select 
          value={outputType} 
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};