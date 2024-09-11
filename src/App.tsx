import { useState } from "react";
import Diagram from "./components/Diagram";
import Modal from "./components/UI/Modal";
import AddCard from "./components/shared/AddCard";
import { initialEdges, initialNodes } from "./constants";
import { node, nodeData } from "./types";

const App: React.FC = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [nodes, setNodes] = useState<node[]>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const toggleHandler = () => setToggleModal((prev) => !prev);

  // Function to add a new node and connect it to the first node
  const addNewNode = (newNode: nodeData) => {
    const newNodeId = (nodes.length + 1).toString(); // Generate new ID
    const newNodePosition = { x: Math.random() * 400, y: Math.random() * 400 }; // Random position

    const nodeToAdd: node = {
      id: newNodeId,
      type: "cardNode",
      position: newNodePosition, // Ensure position is always defined
      data: {
        companyName: newNode.companyName,
        imageUrl: newNode.imageUrl,
        position: "Top",
      },
    };

    setNodes((prevNodes) => [...prevNodes, nodeToAdd]);

    // Add an edge between the new node and the first node (id: "1")
    setEdges((prevEdges) => [...prevEdges, { id: `e1-${newNodeId}`, source: "1", target: newNodeId }]);

    toggleHandler(); // Close modal after adding the node
  };

  return (
    <>
      {toggleModal && (
        <Modal onClose={toggleHandler}>
          <AddCard onAddCard={addNewNode} onClose={toggleHandler} />
        </Modal>
      )}
      <main>
        <div className="container mx-auto px-6 mt-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl leading-loose">
              نمودار شرکت
              <span className="text-primary font-bold text-3xl"> ریرا </span>
              <br />
              به همراه دپارتمان های مجموعه ما
            </h1>

            <button
              onClick={toggleHandler}
              type="button"
              className="border-none outline-none shadow px-4 py-2 rounded text-center bg-primary text-white transition-all ease-in duration-300 hover:bg-secondary"
            >
              افزودن دپارتمان
            </button>
          </div>
        </div>

        <Diagram nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
      </main>
    </>
  );
};

export default App;
