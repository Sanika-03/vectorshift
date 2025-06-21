import React, { useState } from 'react';
import BaseNode from '../components/baseNode';

export const ReqNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode 
      title="Input" 
      id={id}
      inputs={[]}
      outputs={[{ id: `${id}-value` }]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label> Method </label>
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            className="node-select"
          >
            <option value="GET">GET</option>
            <option value="PUT">PUT</option>
            <option value="POST">POST</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>

        <label> URL </label>
        <input 
          type="text" 
          value={data.url || ''}
          onChange={(e) => data.setUrl(e.target.value)}
          className="node-input"
          placeholder="Enter URL"
        />
        <label> Headers </label>
        <textarea 
          value={data.headers || ''}
          onChange={(e) => data.setHeaders(e.target.value)}
          className="node-textarea"
          placeholder="Enter headers in JSON format"
        />
        <label> Body </label>
        <textarea 
          value={data.body || ''}
          onChange={(e) => data.setBody(e.target.value)}
          className="node-textarea"
          placeholder="Enter body in JSON format"
        />        
      </div>
    </BaseNode>
  );
};