import React, { useState } from 'react';
import BaseNode from '../components/baseNode';

export const InputNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode 
      title="Input" 
      id={id}
      inputs={[]}
      outputs={[{ id: `${id}-value` }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label> Type </label>
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            className="node-select"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
      </div>
    </BaseNode>
  );
};