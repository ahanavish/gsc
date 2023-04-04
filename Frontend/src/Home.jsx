import React from "react";
import { Link } from "react-router-dom";
import logo from './Media/logoo.png'

function Home() {
    return (
        <div className="container">
            <div className="content">
                <video autoPlay muted playsInline loop className="background-clip" src="https://globalfishingwatch.org/wp-content/uploads/fishing-map-release-home-header-1600-169-1.mp4">
                </video>
                <div><img className="applogo" src={logo} alt="Wattwise Logo"></img></div>
                <h1>WattWise</h1>
                <Link to="/signin">
                    <button>Let's be wise with Electricity</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;