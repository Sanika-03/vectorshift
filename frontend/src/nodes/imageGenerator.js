import React, { useState, useRef, useEffect } from 'react';
import BaseNode from '../components/baseNode';

export const ImageNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState(data?.text || '');
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
      title="Image Generator" 
      id={id}
      inputs={[{ id: `${id}-prompt-input`, label: "Prompt" }]}
      outputs={[{ id: `${id}-image-output` }]}
      minWidth={450}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label>Image Prompt</label>
          <textarea
            placeholder="Describe the image you want to generate..."
          />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-greyBorder rounded-md"
            placeholder="Enter input {{variables}} or description"
            rows={3}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <label>Style</label>
            <select>
              <option disabled>Select Style</option>
              <option>Realistic</option>
              <option>Anime</option>
              <option>Painting</option>
              <option>Pixel</option>
            </select>
          </div>
          
          <div className="flex flex-col w-full">
            <label>Size</label>
            <select>
              <option disabled>Select Size</option>
              <option>512x512</option>
              <option>768x768</option>
              <option>1024x1024</option>
            </select>
          </div>
        </div>
        
        <div className="mt-2 bg-gray-50 p-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Generated Image</div>
            <button className='flex items-center h-9 w-full text-purple bg-lavendar font-semibold border border-purple text-sm py-2 px-4 rounded-lg'>            Generate
            </button>
          </div>
        </div>
      </div>
    </BaseNode>
)};