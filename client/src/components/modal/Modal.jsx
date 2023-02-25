
import './scss/modal.css'
function Modal({ onClose, children, onShow }) {
  return (
    onShow && (
      <div className="modal_overlay" onClick={onClose}>
        <div className="modal_wrapper">
          <div className="modal_content">
            {children}
            <button className="close_btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
