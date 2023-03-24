import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

function Navbar() {
    const { logOut } = UserAuth()

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="navbar">
            <Link to="/dashboard">
                <div className="brand-name">
                    Project Name
                </div>
            </Link>
            <div className="options">
                <Link to="/guide"><div className="guide">Guide</div></Link>
                <Link to="/analyze"><div className="analyze">Analyze</div></Link>
                <div className="logout" onClick={handleSignOut}>Log Out</div>
            </div>
        </div>
    );
}



export default Navbar;
