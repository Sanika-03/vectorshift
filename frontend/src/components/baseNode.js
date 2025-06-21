import React from 'react';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ 
  title, 
  id, 
  data, 
  inputs = [], 
  outputs = [], 
  children,
  minWidth = 240,
  minHeight = 'auto'
}) => {
    const [currentTitle, setcurrentTitle] = useState(data?.inputName || id.replace('customInput-', 'input_'));
    
  return (
    <div 
      className="relative bg-white rounded-lg shadow-sm border border-gray-200"
      style={{ minWidth: `${minWidth}px`, minHeight: `${minHeight}px` }}
    >
      <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
        {title}
      </div>
      
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        {inputs.map((input, index) => (
          <Handle
            key={input.id || `${id}-input-${index}`}
            type="target"
            position={Position.Left}
            id={input.id || `${id}-input-${index}`}
            className="bg-purple border-4 border-white"
            style={{
              top: `${(index + 1) * 25}px`,
              ...input.style
            }}
          />
        ))}
      </div>

      <div className='flex justify-center items-center'>
        <label className='m-2 bg-purple text-white p-0.5 rounded-lg w-full flex justify-center items-center'>
          <input 
            type="text" 
            value={currentTitle} 
            onChange={(e) => setcurrentTitle(e.target.value)} 
            className="node-input bg-inherit text-center"
          />
        </label>
      </div>

      <div className="p-3">
        {children || (
          <div className="text-gray-600">
            {data?.description || `${title} node`}
          </div>
        )}
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        {outputs.map((output, index) => (
          <Handle
            key={output.id || `${id}-output-${index}`}
            type="source"
            position={Position.Right}
            id={output.id || `${id}-output-${index}`}
            className="bg-purple border-4"
            style={{
              top: `${(index + 1) * 25}px`,
              ...output.style
            }}
          />
        ))}
      </div>

    {/* <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
        {id}
      </div> */}
    </div>
  );
};

export default BaseNode;