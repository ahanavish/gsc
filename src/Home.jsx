import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <div className="content">
                <video autoPlay muted playsInline loop className="background-clip" src="https://globalfishingwatch.org/wp-content/uploads/fishing-map-release-home-header-1600-169-1.mp4">
                </video>
                <h1>Project Name</h1>
                <Link to="/login">
                    <button>Let's Save Energy</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;