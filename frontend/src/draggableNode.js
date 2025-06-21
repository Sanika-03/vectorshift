// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="w-24 h-20 bg-white border border-lavendar rounded-lg shadow-sm flex flex-col items-center justify-center gap-1 cursor-grab hover:shadow-md transition"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
    >
      <box-icon name={icon} color="#202774bd" />
      <span className="text-xs text-labelText font-medium">{label}</span>
      </div>
    );
  };
  