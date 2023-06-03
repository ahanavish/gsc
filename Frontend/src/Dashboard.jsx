import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { UserAuth } from './context/AuthContext';
import { Chart } from "react-google-charts";
import { useState } from "react";

var dArray = [];
var eArray = [];
var data1 = [
    ["Date", "Consumption of Electricity"]
];

var data2 = [
    ["Date", "Consumption of Electricity"]
];

const options1 = {
    colors: ["#8e0152", "#276419"],
    pointSize: 70,
    chart: {
        title: "Personal Consumption (in kWh)"
    },
    height: 210,
    legend: { position: 'none' },
};

const options2 = {
    chart: {
        title: "Statewise Consumption (in MWh)"
    },
    height: 220,
    legend: { position: 'none' }
};

function Dashboard() {
    const { user } = UserAuth();
    const [dayArray, setdayArray] = useState(dArray);
    const [engyArray, setengyArray] = useState(eArray);
    const [graph2, setgraph2] = useState({});
    const [maxPower, setmaxPower] = useState("");
    const [maxDuration, setmaxDuration] = useState("");

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
                if (data.data) {
                    setdayArray(data.data.day);
                    setengyArray(data.data.engy);
                    setgraph2(data.data.data2.atav);
                    setmaxPower(data.data.MaxP);
                    setmaxDuration(data.data.MaxD);
                }
            })
            .catch(error => console.error(error));

        fetch('http://localhost:8080/profile?uid=' + user.uid, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setstateValue(data.data.state);
                // console.log(data.data.state);
                setmembersValue(data.data.members);
            })
            .catch(error => console.error(error));
    }, []);

    console.log(maxPower);
    console.log(maxDuration);
    data1 = [["Date", "Consumption of Electricity"], [0, 0]];
    var len1, total_power_consumed, total_power_consumed2, user_average, user_average2;
    console.log(dayArray, 'grgrt')
    if (dayArray.length !== 0) {
        len1 = dayArray.length;
        total_power_consumed = 0;
        data1.pop();
        for (var i = 0; i < len1; i++) {
            total_power_consumed += engyArray[i];
            var arr = [dayArray[i], engyArray[i]]
            data1.push(arr);
        }
        //kw hour (not per person) - 10 to 30

        total_power_consumed2 = Math.floor(total_power_consumed * 100) / 100;
        user_average = total_power_consumed2 / len1;
        user_average2 = Math.floor(user_average * 100) / 100;
    }

    console.log(graph2);
    console.log(graph2.Dates);
    var states = graph2[stateValue]
    console.log(states, 'statevalue'); //MWatt - population
    data2 = [["Date", "Consumption of Electricity"], [0, 0]];
    var len2;
    if (states !== undefined) {
        len2 = states.length
        data2.pop();
        for (var j = 0; j < len2; j++) {
            var a = [graph2.Dates[j], states[j]]
            data2.push(a);
        }
    }

    return (
        <div className="dash">
            <Navbar item1="Guide" item2="Analyze" item3="Predict" item4="Pay" item5="About" />
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
                    <h1>Total power consumed: {total_power_consumed2} </h1>
                    <h1>User Average: {user_average2} </h1>
                    <h1>Appliance consuming max power: {maxPower} </h1>
                    <h1>Appliance consumed for max duration: {maxDuration} </h1>
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
                    data={data2}
                    options={options2}
                />
            </div>
        </div>
    );
}

export default Dashboard;
