import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { UserAuth } from './context/AuthContext';
import { Chart } from "react-google-charts";
import { useState } from "react";

var dArray = [];
var eArray = [];
var usArray = [];
var daArray = [];

var data1 = [
    ["Date", "Consumption of Electricity"]
];

const options1 = {
    chart: {
        title: "Users"
    },
    height: 205,
    legend: { position: 'none' }
};

function Dashboard() {
    const { user } = UserAuth();
    const [dayArray, setdayArray] = useState(dArray);
    const [engyArray, setengyArray] = useState(eArray);
    const [ustateArray, setustateArray] = useState(usArray);
    const [dateArray, setdateArray] = useState(daArray);

    const [stateValue, setstateValue] = useState("");
    const [membersValue, setmembersValue] = useState("");
    const str = JSON.stringify(user.photoURL);
    const leng = str.length;
    const url = str.substring(1, leng - 1);
    console.log(user);

    useEffect(() => {
        fetch('http://localhost:8080/timeseries?uid=' + user.uid, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setdayArray(data.data.day);
                setengyArray(data.data.engy);
                // setustateArray(data.data.data2.atav)
            })
            .catch(error => console.error(error));

        fetch('http://localhost:8080/profile?uid=' + user.uid, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setstateValue(data.data.state);
                setmembersValue(data.data.members);
            })
            .catch(error => console.error(error));
    }, []);

    data1 = [["Date", "Consumption of Electricity"]];
    var len = dayArray.length;
    for (var i = 0; i < len; i++) {
        var arr = [dayArray[i], engyArray[i]]
        data1.push(arr);
    }

    return (
        <div className="dash">
            <Navbar item1="Guide" item2="Analyze" item3="Predict" item4="About" />
            <div className="column1row1">
                <div className="userImage">
                    <img src={url} alt="profileImage"></img>
                </div>
                <div className="userInfo">
                    <h1>Name: {user.displayName}</h1>
                    <h1>Email Id: {user.email}</h1>
                    <h1>State: {stateValue}</h1>
                    <h1>No of family members: {membersValue}</h1>
                </div>
                <div></div>
            </div>
            <div className="column1row2">
                <div className="userInfo2">
                    <h1>Total power consumed: </h1>
                    <h1>Appliance consumed max power: Television</h1>
                    <h1>Power consumed by __-------------__: </h1>
                    <h1>Appliance consumed for max duration: </h1>
                </div>
            </div>
            <div className="column2row1">
                <Chart
                    chartType="Line"
                    width="100%"
                    height="200px"
                    data={data1}
                    options={options1}
                />
            </div>
            <div className="column2row2">
                <Chart
                    chartType="Line"
                    width="100%"
                    height="200px"
                    data={data1}
                    options={options1}
                />
            </div>
        </div>
    );
}

export default Dashboard;


