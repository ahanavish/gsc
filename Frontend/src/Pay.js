import React from "react";
import Navbar from "./Navbar";

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
                                <th>Biller: </th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Bill Amount: </th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Account ID: </th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Due date: </th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Bill Date: </th>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div className="submitBtn">
                        <button>Pay Bill</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;