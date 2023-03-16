import React from 'react';


class Guide extends React.Component {
    constructor(props) {
        super(props)
        this.getVideos = this.getVideos.bind(this);
    }

    getVideos() {
        let nextPageToken = ""
        fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=PLJs4FDgaiwEyTZn3vVF2JVDjYSVlTXpis&key=AIzaSyADVQSN_gaA0sP0Iz6cBqZ2VTAPZdrrU2c&pageToken=" + nextPageToken)
            .then((result) => {
                return result.json()
            }).then((data) => {
                let videos = data.items
                nextPageToken = data.nextPageToken
                let videoContainer = document.querySelector(".youtube-container")
                for (let v of videos) {
                    videoContainer.innerHTML += `<img src ="${v.snippet.thumbnails.default.url}">`
                }
            })
    }

    render() {
        this.getVideos();
        return (
            <h1>jhghv</h1>
        );
    }
};

export default Guide;