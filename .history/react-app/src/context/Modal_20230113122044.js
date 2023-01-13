import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        <div id="modal-topbar">
          <h1 className="login-form-title">Log In</h1>
          <button onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalNode
  );
}

// export function SortedModal({ onClose, children }) {
//   const modalNode = useContext(ModalContext);
//   if (!modalNode) return null;

//   return ReactDOM.createPortal(
//     <div id="sortModal">
//       <div id="sortModal-background" onClick={onClose} />
//       <div id="sortModal-content">{children}</div>
//     </div>,
//     modalNode
//   );
// }
