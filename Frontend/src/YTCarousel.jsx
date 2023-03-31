import React, { useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';

let thumbnailArray = [];
let titleArray = [];
let urlArray = [];

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function createCard(i) {
    return (
        <Card thumbnail={thumbnailArray[i]} url={urlArray[i]} title={titleArray[i]} />
    );
}

function YTCarousel(props) {
    useEffect(() => {
        let nextPageToken = ""
        fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=PLJs4FDgaiwEyTZn3vVF2JVDjYSVlTXpis&key=AIzaSyADVQSN_gaA0sP0Iz6cBqZ2VTAPZdrrU2c&pageToken=" + nextPageToken)
            .then((result) => {
                return result.json()
            }).then((data) => {
                console.log(data)
                let videos = data.items
                nextPageToken = data.nextPageToken
                // let videoContainer = document.querySelector(".youtube-container")
                for (let v of videos) {
                    thumbnailArray.push(`${v.snippet.thumbnails.default.url}`)
                    urlArray.push(`${v.snippet.resourceId.videoId}`)
                    titleArray.push(`${v.snippet.title}`)
                }
            })
    }, [])

    return (
        <div className="carousel-wrapper">
            <h1 className='youtube-head'>WATCH</h1>
            <div className='youtube-container'>
                <Carousel responsive={responsive}>
                    {createCard(0)}
                    {createCard(1)}
                    {createCard(2)}
                    {createCard(3)}
                    {createCard(4)}
                    {createCard(5)}
                    {createCard(6)}
                    {createCard(7)}
                    {createCard(8)}
                </Carousel>
            </div>
        </div>
    );
}

export default YTCarousel;