import React from "react";
import "../AboutCard/ModelStyle.css"; // Assuming the CSS file is named ModalStyle.css

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay-aboutCard" onClick={handleClose}>
      <div className="modal-content-aboutCard" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
