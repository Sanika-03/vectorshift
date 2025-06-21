import { ResultPopup } from './components/resultPopup';
import { useStore } from './store';
import React, { useState } from 'react';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [result, setResult] = useState({
    nodes: 0,
    edges: 0,
    isDAG: true,
  })

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();
      setResult({
        nodes: result.num_nodes,
        edges: result.num_edges,
        isDAG: result.is_dag,
      });
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <ResultPopup
        showModal={showModal}
        setShowModal={setShowModal}
        nodes={result.nodes}
        edges={result.edges}
        dag={result.isDAG}
    />
    <div className="flex justify-center">
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple text-white rounded transition"
      >
        Submit Pipeline
      </button>
    </div>
    </>
  );
};
