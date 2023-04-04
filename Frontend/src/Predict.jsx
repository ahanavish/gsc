import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { UserAuth } from './context/AuthContext';
import { Chart } from "react-google-charts";

var dArray = [];
var eArray = [];
var data3 = [
    ["Date", "Consumption of Electricity"]
];

const options3 = {
    chart: {
        title: "Predicted Consumption (in kWh)"
    },
    height: 305,
    legend: { position: 'none' }
};
function Predict() {
    const { user } = UserAuth();
    const [dayArray, setdayArray] = useState(dArray);
    const [energyArray, setenergyArray] = useState(eArray);

    useEffect(() => {

        fetch('http://localhost:8080/inference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": { "uid": user.uid },
                "emailVerified": user.emailVerified
            })
        })
            .then(response => response.json())
            .then(data => {
                // console.log(JSON.parse(data.data));
                setdayArray(JSON.parse(data.data).date);
                setenergyArray(JSON.parse(data.data).energy)

            })
            .catch(error => console.error(error));
    }, [])

    data3 = [["Date", "Consumption of Electricity"], [0, 0]];

    if (dayArray.length !== 0) {
        var len = dayArray.length;
        data3.pop()
        for (var i = 0; i < len; i++) {
            var arr = [dayArray[i], energyArray[i][0]]
            data3.push(arr);
        }
    }
    //kw hour (10-30)

    return (
        <div>
            <Navbar item1="Dashboard" item2="Guide" item3="Analyze" item4="About"></Navbar>
            <div className="predictBox">
                <Chart
                    chartType="Line"
                    width="100%"
                    height="200px"
                    data={data3}
                    options={options3}
                />
            </div>
        </div>
    );
}

export default Predict;