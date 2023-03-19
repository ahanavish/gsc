import React from "react";

function Modal({ open, onClose }) {
    if (!open) return null;

    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="modalContainer">

                <p onClick={onClose} className='closeBtn'>X</p>
            </div>
        </div>
    );
}

export default Modal;