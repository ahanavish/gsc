import React from "react";

function Card(props) {
    const handleCardClick = url => {
        const str = JSON.stringify(url);
        window.open('https://youtu.be/' + str.substring(1, 12), '_blank');
    }

    return (
        <div className="card-wrapper">
            <img src={props.thumbnail} className="yt-thumbnail" onClick={() => handleCardClick(props.url)}></img>
            <div className="overlay-text">{props.title}</div>
        </div>
    );
}

export default Card;