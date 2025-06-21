// src/nodes/DatabaseNode.js
import BaseNode from '../components/baseNode';

export const DBNode = ({ id, data }) => (
  <BaseNode 
    title="DB Query" 
    id={id}
    inputs={[{ id: `${id}-connection` }]}
    outputs={[{ id: `${id}-results` }]}
    minWidth={340}
  >
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex flex-col">
        <label>Database Connection</label>
        <select>
          <option disabled>Select DB</option>
          <option>DB1</option>
          <option>DB2</option>
          <option>DB3</option>
        </select>
      </div>
      
      <div className="flex-1 flex flex-col">
        <label>SQL Query</label>
        <textarea
          placeholder="SELECT * FROM table"
          defaultValue="SELECT * FROM customers WHERE country = 'India'"
        />
      </div>
      
      <div className="flex justify-between gap-2">
        <button className='h-9 w-full text-purple text-center bg-lavendar font-semibold border border-purple py-2 px-4 rounded-lg'>          
            Run Query
        </button>
        <button className="border border-purple text-purple font-semibold w-full py-1 rounded">
          Save
        </button>
      </div>
      
      <div className="text-xs flex justify-between">
        <span>Results: 0 rows</span>
        <span>Execution: 0.23s</span>
      </div>
    </div>
  </BaseNode>
);