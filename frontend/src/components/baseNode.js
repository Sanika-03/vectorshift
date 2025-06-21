import React, { useState, useRef, useEffect } from 'react';
import BaseNode from '../components/baseNode';
import { useReactFlow } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore(state => state.updateNodeField);
  const { getNodes, getEdges, addEdges, deleteElements } = useReactFlow();

  // Extract variables from {{variable}} syntax
  const extractVariables = () => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.add(match[1]);
    }
    return [...matches];
  };

  const getAllNodeNames = () => {
    return getNodes().map(node =>
      node.type === 'customInput' && node.data?.inputName
        ? node.data.inputName
        : node.id
    );
  };

  const getMatchingNode = (varName) => {
    return getNodes().find(
      node => node.data?.inputName === varName || node.id === varName
    );
  };

  useEffect(() => {
    const allNodeNames = getAllNodeNames();
    const extractedVars = extractVariables();
    setVariables(extractedVars);
    updateNodeField(id, 'text', text);
    updateNodeField(id, 'variables', extractedVars);

    const currentEdges = getEdges();

    // Remove any existing edges from this TextNode not matching current variables
    const textNodeEdges = currentEdges.filter(edge => edge.target === id);
    const validHandles = extractedVars.map(v => `${id}-${v}`);

    const edgesToRemove = textNodeEdges.filter(
      edge => !validHandles.includes(edge.targetHandle)
    );

    if (edgesToRemove.length) {
      deleteElements({ edges: edgesToRemove });
    }

    // Create new edges where necessary
    extractedVars.forEach(varName => {
      const sourceNode = getMatchingNode(varName);
      if (!sourceNode) return;

      const sourceHandle = 'text';
      const targetHandle = `${id}-${varName}`;

      const alreadyConnected = currentEdges.some(edge =>
        edge.source === sourceNode.id &&
        edge.target === id &&
        edge.sourceHandle === sourceHandle &&
        edge.targetHandle === targetHandle
      );

      if (!alreadyConnected) {
        addEdges([{
          id: `edge-${sourceNode.id}-${id}-${varName}`,
          source: sourceNode.id,
          sourceHandle,
          target: id,
          targetHandle,
          type: 'default'
        }]);
      }
    });
  }, [text, getNodes]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(80, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  const validVariables = variables.filter(v => getMatchingNode(v));

  return (
    <BaseNode
      title="Text Template"
      id={id}
      headerColor="bg-green-500"
      inputs={validVariables.map((varName, index) => ({
        id: `${id}-${varName}`,
        label: varName,
        style: { top: `${40 + index * 30}px` }
      }))}
      outputs={[{ id: `${id}-output` }]}
      minWidth={260}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Template Text</label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter text with {{variables}}"
            rows={3}
          />
        </div>
      </div>
    </BaseNode>
  );
};