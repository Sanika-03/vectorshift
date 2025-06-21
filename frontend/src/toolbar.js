// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
    <div className="sticky top-0 z-40 w-full bg-gradient-to-b from-white to-[#e1d7ff57] px-6 py-4 border-b border-greyBorder shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-purple"> Toolbox</h2>
        <span className="text-sm text-labelText">Drag to canvas</span>
        </div>
        <div className="flex flex-wrap gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent pb-1">
            <DraggableNode type='customInput' label='Input' icon='edit-alt' />
            <DraggableNode type='llm' label='LLM' icon='server' />
            <DraggableNode type='customOutput' label='Output' icon='archive-out'/>
            <DraggableNode type='text' label='Text' icon='text'/>
            <DraggableNode type='http' label='Request' icon='transfer-alt'/>
            <DraggableNode type='list' label='List' icon='list-ul'/>
            <DraggableNode type='date' label='Date' icon='calendar'/>
            <DraggableNode type='image' label='Image Generator' icon='images'/>
            <DraggableNode type='db' label='DB Query' icon='collection' />
        </div>
    </div>
    );
};
