import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

function Navbar(props) {
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
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <div className="brand-name">
                    Project Name
                </div>
            </Link>
            <div className="options">
                {
                    props.item1 === "Guide" && props.item2 === "Analyze" &&
                    <div>
                        <Link to="/guide" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/analyze" style={{ textDecoration: 'none' }}><div className="item2">{props.item2}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
                {
                    props.item1 === "Dashboard" && props.item2 === "Analyze" &&
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/analyze" style={{ textDecoration: 'none' }}><div className="item2">{props.item2}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
                {
                    props.item1 === "Dashboard" && props.item2 === "Guide" &&
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/guide" style={{ textDecoration: 'none' }}><div className="item2">{props.item2}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }

            </div>
        </div>
    );
}



export default Navbar;
