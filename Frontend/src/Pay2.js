import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

var s = true;
function Pay2() {
    return (
        <div>
            <Navbar item1="Dashboard" item2="Guide" item3="Analyze" item4="Predict" item5="About" />
            <div className="form">
                <div className="pay2wrapper">
                    {s &&
                        <div>
                            <h1>Transaction Successful</h1>
                            <div className="payBtn">
                                <Link to="/dashboard" style={{ textDecoration: 'none' }}><button>Go to Dashboard</button></Link>
                            </div>
                        </div>
                    }

                    {!s &&
                        <div>
                            <h1>Transaction Failed</h1>
                            <div className="payBtn">
                                <Link to="/pay" style={{ textDecoration: 'none' }}><button>Try Again</button></Link>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default Pay2;