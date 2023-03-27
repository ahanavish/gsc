import React from "react";
import Navbar from "./Navbar";
import { Chart } from "react-google-charts";



function About() {
    const options = {
        title: "State vs. Time comparison",
        hAxis: { title: "Time", viewWindow: { min: 0, max: 15 } },
        vAxis: { title: "State", viewWindow: { min: 0, max: 15 } },
        legend: "none"
    };

    // 1/10/2019	80.7
    // 1/11/2019	52.4
    // 1/12/2019	139.1
    // 1/13/2019	89.4
    // 1/14/2019	82.2
    // 1/15/2019	77.8
    // 1/16/2019	111.8
    // 1/17/2019	115.6
    // 1/18/2019	117.9
    // 1/19/2019	121.9

    const data = [
        ["Time", "Delhi", "UP"],
        [7, 103.8, 80.7],
        [8, 99.3, 52.4],
        [9, 113.9, 139.1],
    ];

    return (
        <div>
            {/* <Navbar item1="Dashboard" item2="Guide" item3="Analyze" /> */}
            <div className="graph">
                <Chart
                    chartType="Line"
                    data={data}
                    options={options}
                    width="80%"
                    height="400px"
                    legendToggle
                />
            </div>
        </div>
    );
}

export default About;