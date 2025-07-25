export default function Modal({ onClose }) {
  return (
    <div className="modal bg-amber-400">
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
