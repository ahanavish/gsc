import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import logo from './Media/logo.jpeg'

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
                    <div><img className="appLogo" src={logo} alt="Italian Trulli"></img></div>
                    <div className="appName">WattWise</div>
                </div>
            </Link>
            <div className="options">
                {
                    props.item1 === "Guide" && props.item2 === "Analyze" && props.item3 === "Predict" && props.item4 === "Pay" && props.item5 === "About" &&
                    <div>
                        <Link to="/guide" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/analyze" style={{ textDecoration: 'none' }}><div className="item1">{props.item2}</div></Link>
                        <Link to="/predict" style={{ textDecoration: 'none' }}><div className="item1">{props.item3}</div></Link>
                        <Link to="/pay" style={{ textDecoration: 'none' }}><div className="item1">{props.item4}</div></Link>
                        <Link to="/about" style={{ textDecoration: 'none' }}><div className="item1">{props.item5}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
                {
                    props.item1 === "Dashboard" && props.item2 === "Analyze" && props.item3 === "Predict" && props.item4 === "Pay" && props.item5 === "About" &&
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/analyze" style={{ textDecoration: 'none' }}><div className="item1">{props.item2}</div></Link>
                        <Link to="/predict" style={{ textDecoration: 'none' }}><div className="item1">{props.item3}</div></Link>
                        <Link to="/pay" style={{ textDecoration: 'none' }}><div className="item1">{props.item4}</div></Link>
                        <Link to="/about" style={{ textDecoration: 'none' }}><div className="item1">{props.item5}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
                {
                    props.item1 === "Dashboard" && props.item2 === "Guide" && props.item3 === "Predict" && props.item4 === "Pay" && props.item5 === "About" &&
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/guide" style={{ textDecoration: 'none' }}><div className="item1">{props.item2}</div></Link>
                        <Link to="/predict" style={{ textDecoration: 'none' }}><div className="item1">{props.item3}</div></Link>
                        <Link to="/pay" style={{ textDecoration: 'none' }}><div className="item1">{props.item4}</div></Link>
                        <Link to="/about" style={{ textDecoration: 'none' }}><div className="item1">{props.item5}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
                {
                    props.item1 === "Dashboard" && props.item2 === "Guide" && props.item3 === "Analyze" && props.item4 === "Pay" && props.item5 === "About" &&
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/guide" style={{ textDecoration: 'none' }}><div className="item1">{props.item2}</div></Link>
                        <Link to="/analyze" style={{ textDecoration: 'none' }}><div className="item1">{props.item3}</div></Link>
                        <Link to="/pay" style={{ textDecoration: 'none' }}><div className="item1">{props.item4}</div></Link>
                        <Link to="/about" style={{ textDecoration: 'none' }}><div className="item1">{props.item5}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
                {
                    props.item1 === "Dashboard" && props.item2 === "Guide" && props.item3 === "Analyze" && props.item4 === "Predict" && props.item5 === "Pay" &&
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/guide" style={{ textDecoration: 'none' }}><div className="item1">{props.item2}</div></Link>
                        <Link to="/analyze" style={{ textDecoration: 'none' }}><div className="item1">{props.item3}</div></Link>
                        <Link to="/predict" style={{ textDecoration: 'none' }}><div className="item1">{props.item4}</div></Link>
                        <Link to="/pay" style={{ textDecoration: 'none' }}><div className="item1">{props.item5}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
                {
                    props.item1 === "Dashboard" && props.item2 === "Guide" && props.item3 === "Analyze" && props.item4 === "Predict" && props.item5 === "About" &&
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><div className="item1">{props.item1}</div></Link>
                        <Link to="/guide" style={{ textDecoration: 'none' }}><div className="item1">{props.item2}</div></Link>
                        <Link to="/analyze" style={{ textDecoration: 'none' }}><div className="item1">{props.item3}</div></Link>
                        <Link to="/predict" style={{ textDecoration: 'none' }}><div className="item1">{props.item4}</div></Link>
                        <Link to="/about" style={{ textDecoration: 'none' }}><div className="item1">{props.item5}</div></Link>
                        <div className="logout" onClick={handleSignOut}>Log Out</div>
                    </div>
                }
            </div>
        </div>
    );
}



export default Navbar;
