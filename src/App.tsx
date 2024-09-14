import { useState } from "react";
import Diagram from "./components/Diagram";
import Modal from "./components/UI/Modal";
import AddCard from "./components/shared/AddCard";
import { useDiagram } from "./store/useDiagram";
import { nodeData } from "./types";

const App: React.FC = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const { addNewNode } = useDiagram();

  const toggleHandler = () => setToggleModal((prev) => !prev);

  const addNodeHandler = (data: nodeData) => {
    addNewNode(data);
    toggleHandler();
  };

  return (
    <>
      {toggleModal && (
        <Modal onClose={toggleHandler}>
          <AddCard onAddCard={(data) => addNodeHandler(data)} onClose={toggleHandler} />
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

        <Diagram />
      </main>
    </>
  );
};

export default App;
