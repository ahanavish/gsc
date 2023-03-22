import React from "react";

function Card(props) {
    return (
        <div className="card-wrapper">
            <img src={props.thumbnail} className="yt-thumbnail"></img>
        </div>
    );
}

export default Card;