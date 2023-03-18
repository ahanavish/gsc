import React from "react";

function Card(props) {
    return (
        <div className="card-wrapper">
            <h1>{props.name}</h1>
            {/* <iframe className="video-frame" src="https://www.youtube.com/embed/sR5Z8AJ-zRU?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        </div>
    );
}

export default Card;