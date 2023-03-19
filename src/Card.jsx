import React, { useState } from "react";
import Modal from "./Modal";
function Card(props) {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className="card-wrapper" onClick={() => setOpenModal(true)}>
            <img src={props.thumbnail} className="yt-thumbnail"></img>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
}

export default Card;