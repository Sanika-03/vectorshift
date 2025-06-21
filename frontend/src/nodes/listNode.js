import React, { useState } from 'react';
import BaseNode from '../components/baseNode';

export const ListNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || 'list');
  const [listItem, setlistItem] = useState([
    {
      item: "",
    },
  ]);
  const addlistItem = () => {
    setlistItem([
      ...listItem,
      {
        item: "",
      },
    ]);
  };

  const Deletequestion = (i) => {
    let listItems = [...listItem];
    if (listItems.length > 1) listItems.splice(i, 1);
    setlistItem(listItems);
  };

  const handlelistItem = (name, i) => (event) => {
    let value = event.target.value;
    let newlistItem = [...listItem];
    newlistItem[i][name] = value;
    setlistItem(newlistItem);
  };

  return (
    <BaseNode 
      title="List" 
      id={id}
      inputs={[]}
      outputs={[{ id: `${id}-value` }]}
      minWidth='300'
    >
        {listItem.map((order, i) => {
        return (
          <div key={i}>
          <div className='flex w-full justify-between gap-1'>
            <input 
              type="text" 
              value={order.listItem} 
              placeholder='Enter List Item'
              onChange={(e) => {
                const newlistItem = [...listItem];
                newlistItem[i].productName = e.target.value;
                setlistItem(newlistItem);
              }} 
              className="node-input w-4/5 pl-2 border-[1px] rounded-md border-greyBorder mb-2"
            />
            {listItem.length > 1 ? (
              <button
                className='h-10 w-1/5 px-4 font-medium text-lg rounded-md text-redDark border border-greyBorder flex justify-center items-center'
                onClick={() => {
                  Deletequestion(i);
                }}
                >
                 <box-icon type='solid' name='trash-alt' color="#c40606"></box-icon>
               </button>
              ):(
                <></>
              )}
          </div>  
          </div>
          );
        })}
          <div className='flex justify-center'>
          <button
            className='flex items-center h-9 w-full text-purple bg-lavendar font-semibold border border-purple text-sm py-2 px-4 rounded-lg'
            type="button"
            onClick={() => {
              addlistItem();
            }}
            >
             + Add Item
           </button>
          </div>
    </BaseNode>
  );
};