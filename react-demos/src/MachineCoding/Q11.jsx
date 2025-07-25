// Create a component that shows how to use portals.

import { useState } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose }) {
  return (
    <div>
      <p>this is Modal Component</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

const Q11 = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <p>
        {showModal &&
          createPortal(
            <Modal
              onClose={() => {
                setShowModal(false);
              }}
            />,
            document.body
          )}
      </p>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Show Modal
      </button>
    </>
  );
};

export default Q11;
