import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Pay() {
    return (
        <div>
            <Navbar item1="Dashboard" item2="Guide" item3="Analyze" item4="Predict" item5="About" />
            <div className="form">
                <div className="paywrapper">
                    <h1>Electricity Bill</h1>
                    <div className="pay">
                        <table className="paytable">
                            <tr>
                                <th>Biller:      </th>
                                <td>PVVNL</td>
                            </tr>
                            <tr>
                                <th>Bill Amount:        </th>
                                <td>2100.0</td>
                            </tr>
                            <tr>
                                <th>Account ID:         </th>
                                <td>4591387000</td>
                            </tr>
                            <tr>
                                <th>Due date:       </th>
                                <td>2020-07-10</td>
                            </tr>
                            <tr>
                                <th>Bill Date:      </th>
                                <td>11 Jun 2020</td>
                            </tr>
                        </table>
                    </div>
                    <div className="submitBtn">
                        <Link to="/pay2" style={{ textDecoration: 'none' }}><button>Pay Bill</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;