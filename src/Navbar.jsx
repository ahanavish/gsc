import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

function Navbar() {
    const { user, logOut } = UserAuth()

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="navbar">
            <div className="brand-name">
                Project Name
            </div>
            {/* <div>Hey, {user?.displayName}</div> */}
            <div className="options">
                <Link to="/guide"><div className="guide">Guide</div></Link>
                <div className="analyze">Analyze</div>
                <div className="logout" onClick={handleSignOut}>Log Out</div>
            </div>
            {/* <img src="" alt="user image" /> */}
        </div>
    );
}



export default Navbar;
