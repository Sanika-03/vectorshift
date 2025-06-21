export const ResultPopup = ({ showModal,setShowModal,nodes,edges,dag}) => {
  return (
    <>
    { showModal ? (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <header className='flex items-center justify-center mb-2 text-center font-semibold text-white bg-purple p-3'>
            Result
        </header>
        <div className="px-4 py-2 flex flex-col items-center gap-3">
        <p>Nodes : {nodes}</p>
        <p>Edges : {edges}</p>
        <p>Is DAG? : {dag === true ? "Yes" : "No"}</p>
        <button className="bg-purple text-white px-4 py-2 rounded w-28 transition">
            <span className="text-sm" onClick={() => setShowModal(false)}>Close</span>
        </button>
        </div>
      </div>
    </div>
  ) : null}
  </>
  )
}