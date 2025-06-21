import BaseNode from '../components/baseNode';
import React, { useState } from 'react';

export const DateNode = ({ id, data }) => {
  const [date, setDate] = useState(data?.date || '');
  return (
    <BaseNode id={id} title="Date Picker" headerColor="bg-yellow-500" outputs={[{ id: `${id}-date` }]}>
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mt-2 p-2 border rounded"
      />
    </BaseNode>
  );
};
