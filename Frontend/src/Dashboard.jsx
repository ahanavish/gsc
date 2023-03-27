import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { UserAuth } from './context/AuthContext';
import { data1, options1 } from './GraphData';
import { Chart } from "react-google-charts";
import { useState } from "react";

function Dashboard() {
    // const { user } = UserAuth();
    // const [stateValue, setstateValue] = useState("");
    // const [membersValue, setmembersValue] = useState("");
    // const str = JSON.stringify(user.photoURL);
    // const len = str.length;
    // const url = str.substring(1, len - 1);
    // console.log(user);

    // var a = null;
    // useEffect(() => {
    //     fetch('http://localhost:8080/profile?uid=b', {
    //         method: 'GET'
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             a = data;
    //             setstateValue(a.data.state);
    //             setmembersValue(a.data.members);
    //         })
    //         .catch(error => console.error(error));
    // }, [user]);

    return (
        <div className="dash">
            <Navbar item1="Guide" item2="Analyze" item3="About" item4="Predict" />
            <div className="column1row1">
                <div className="userImage">
                    {/* <img src={url}></img> */}
                </div>
                <div className="userInfo">
                    {/* <h1>Name: {user.displayName}</h1>
                    <h1>Email Id: {user.email}</h1>
                    <h1>Phone No: {user.phone}</h1>
                    <h1>State: {stateValue}</h1>
                    <h1>No of family members: {membersValue}</h1> */}
                </div>
                <div className="editBtn">
                    <button >Edit Profile</button>
                </div>
                <div></div>
            </div>
            <div className="column1row2">
                <div className="userInfo2">
                    <h1>Total power consumed: </h1>
                    <h1>Appliance which consumed max power: Television</h1>
                    <h1>Appliance which was consumed for max duration: </h1>
                </div>
            </div>
            <div className="column2row1">
                <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={data1}
                    options={options1}
                />
            </div>
            <div className="column2row2">
                <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={data1}
                    options={options1}
                />
            </div>
        </div>
    );
}

export default Dashboard;


