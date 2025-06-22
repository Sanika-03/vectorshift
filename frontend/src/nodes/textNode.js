// src/nodes/TextNode.js
import React, { useState, useRef, useEffect } from 'react';
import BaseNode from '../components/baseNode';
import { Handle, Position, useReactFlow } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore(state => state.updateNodeField);
  const { getNodes } = useReactFlow();

  const extractValidVariables = () => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_-]*)\s*\}\}/g;
    const matches = [];
    let match;
  
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1].trim());
    }
  
    const validNodeIds = getNodes()
      .filter(node => node?.data?.nodeType === 'customInput')
      .map(node => node.id);
  
    // console.log('Valid node IDs:', validNodeIds);
  
    const validMatches = matches.filter(name => validNodeIds.includes(name));
    // console.log('Valid Matches:', validMatches);
  
    return [...new Set(validMatches)];
  };

  useEffect(() => {
    const newVariables = extractValidVariables();
    setVariables(newVariables);
    // console.log(getNodes());

    updateNodeField(id, 'text', text);
    updateNodeField(id, 'variables', newVariables);
  }, [text, getNodes]);

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
        id: varName,
        label: varName,
        style: { top: `${40 + index * 30}px` }
      }))}
      outputs={[{ id: `${id}-output` }]}
      minWidth={260}
    >
      <div className="space-y-3">
        <label>Template Text</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-greyBorder rounded-md"
          placeholder="Enter text with {{variables}}"
          rows={3}
        />

        {variables.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-700">Detected Variables</h3>
              <span className="text-xs text-labelText">{variables.length} found</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {variables.map(varName => (
                <span
                  key={varName}
                  className="px-2 py-1 text-xs bg-lavendar text-purple rounded-md"
                >
                  {varName}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-labelText">
          <p>Tip: Use double curly braces to create variables: &#123;&#123;variable_name&#125;&#125;</p>
          <p className="mt-1">Each variable will create a connection handle on the left side</p>
        </div>
      </div>
    </BaseNode>
  );
};