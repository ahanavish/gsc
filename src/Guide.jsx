import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';

let videoArray = [];

class Guide extends React.Component {
    constructor(props) {
        super(props)
        this.getVideos = this.getVideos.bind(this);
        this.createCard = this.createCard.bind(this);
    }

    getVideos() {
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
                    videoArray.push(`${v.snippet.channelTitle}`)
                }
            })
        console.log(videoArray);
    }

    createCard() {
        console.log(videoArray);
        return (
            <Card name={videoArray[0]} />
        );
    }

    render() {
        this.getVideos();
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
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

        return (
            <div>
                <div className='youtube-container'>
                    <h1>{videoArray[0]}</h1>
                    <Carousel responsive={responsive}>
                        {this.createCard()}
                    </Carousel>
                </div>
            </div>
        );
    }
};

export default Guide;
