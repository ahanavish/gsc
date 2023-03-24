import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';

let thumbnailArray = ["https://www.unicef.org/armenia/sites/unicef.org.armenia/files/styles/media_large_image/public/NMP_3662.jpg?itok=M-2NW8Qf", "https://www.wikihow.com/images/thumb/b/ba/Save-Electricity-Step-2-Version-3.jpg/aid338822-v4-728px-Save-Electricity-Step-2-Version-3.jpg.webp", "https://www.trvst.world/wp-content/uploads/2019/05/save-electricity-at-home.jpg", "https://www.unicef.org/armenia/sites/unicef.org.armenia/files/styles/media_large_image/public/NMP_0952.jpg?itok=jlIbxYyI", "https://www.earthava.com/wp-content/uploads/2020/02/1-1.jpg", "https://energysavingpros.com/wp-content/uploads/2021/03/vera-cho-eFoFASAuSgo-unsplash.jpg", "https://www.energysage.com/cms/filer/58/af/58afbd5e-8cb9-4dac-9bec-288f07033caf/21_top.png", "https://www.1energysystems.com/wp-content/uploads/2021/12/12-Ways-To-Reduce-Electricity-Consumption-At-Home.jpg?ezimgfmt=rs%3Adevice%2Frscb1-1", "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202010/socket-304983_960_720_1200x768.jpeg?"];
let titleArray = ["How to Save Electricity - Wikihow", "101 Ways to Save Electricity - EnergyBot", "17 Ways How to Save Electricity at Home - TRVST", "10 Easy Steps to Save Electricity and Reduce Bills - Crompton", "7 Ways to Reduce Electricity Usage at Home - Earthava", "12 ways to reduce Energy Consumption At Home - Energysavingpros", "15 ways to conserve energy and save on your electric bill - energysage", "12 Ways To Reduce Electricity Consumption At Home - 1energysystem", "How to control electricity consumption: Here is all you need to know - indiatoday"];
let urlArray = ["https://www.unicef.org/armenia/en/stories/9-ways-save-energy-home", "https://www.wikihow.com/Save-Electricity", "https://www.energybot.com/blog/ways-to-save-electricity.html", "https://www.trvst.world/renewable-energy/save-electricity-at-home/", "https://www.crompton.co.in/blogs/home-appliances/10-easy-steps-to-save-electricity-bill/", "https://www.earthava.com/ways-to-reduce-electricity-usage/#:~:text=7%20Ways%20to%20Reduce%20Electricity%20Usage%20at%20Home,home%E2%80%99s%20insulation%20...%208%20To%20Sum%20Up%20", "https://energysavingpros.com/12-ways-to-reduce-energy-consumption-at-home/", "https://www.energysage.com/energy-efficiency/101/ways-to-save-energy/", "https://www.1energysystems.com/12-ways-to-reduce-electricity-consumption-at-home/", "https://www.indiatoday.in/information/story/how-to-control-electricity-consumption-here-is-all-you-need-to-know-1733497-2020-10-20"];

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

function BlogCarousel() {
    return (
        <div className="carousel-wrapper">
            <h1 className='blog-head'>READ</h1>
            <div className='blog-container'>
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

export default BlogCarousel;