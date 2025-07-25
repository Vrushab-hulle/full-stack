import { useState } from "react";
import Modal from "./Modal";

export default function NoPortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal without a portal
      </button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
}
