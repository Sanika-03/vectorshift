// src/nodes/TextNode.js
import React, { useState, useRef, useEffect } from 'react';
import BaseNode from '../components/baseNode';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore(state => state.updateNodeField);
  
  // Extract variables from text
  const extractVariables = () => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]); // Capture group 1 is the variable name
    }
    
    return [...new Set(matches)]; // Return unique variables
  };
  
  // Update variables when text changes
  useEffect(() => {
    const newVariables = extractVariables();
    setVariables(newVariables);
    
    // Update store with current text and variables
    updateNodeField(id, 'text', text);
    updateNodeField(id, 'variables', newVariables);
  }, [text]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(
        80, 
        textareaRef.current.scrollHeight
      )}px`;
    }
  }, [text]);

  return (
    <BaseNode 
      title="Text Template" 
      id={id}
      headerColor="bg-green-500"
inputs={variables.map((varName, index) => ({
  id: varName, // ✅ this lets React Flow match it to upstream node's output
  label: varName,
  style: { top: `${40 + index * 30}px` }
}))}

      outputs={[{ id: `${id}-output` }]}
      minWidth={260}
    >
      <div className="space-y-3">
        <label className="block text-xs text-gray-500 mb-1">Template Text</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter text with {{variables}}"
          rows={3}
        />
        
        {variables.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-700">Detected Variables</h3>
              <span className="text-xs text-gray-500">{variables.length} found</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {variables.map(varName => (
                <span 
                  key={varName} 
                  className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md"
                >
                  {varName}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          <p>Tip: Use double curly braces to create variables: &#123;&#123;variable_name&#125;&#125;</p>
          <p className="mt-1">Each variable will create a connection handle on the left side</p>
        </div>
      </div>
    </BaseNode>
  );
};