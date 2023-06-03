import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { UserAuth } from './context/AuthContext';
import { useNavigate } from "react-router-dom";

function Analyze() {
    let navigate = useNavigate();
    const { user } = UserAuth();

    const [inputList, setinputList] = useState([{ appName: '', wattage: '', hours: '' }]);

    const handleinputchange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;

        setinputList(list);
    }

    const handleRemoveField = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setinputList(list);
    }

    const handleAddField = () => {
        setinputList([...inputList, { appName: '', wattage: '', hours: '' }]);
    }

    var appArray = [];
    var timeArray = [];
    var wattArray = [];

    const handleSubmit = () => {
        let list = inputList;

        for (var i = 0; i < list.length; i++) {
            appArray.push(list[i].appName);
            timeArray.push(list[i].hours);
            if (list[i].wattage !== "")
                wattArray.push(list[i].wattage)
            else
                wattArray.push("");
        }

        // console.log(appArray);
        // console.log(wattArray);
        // console.log(timeArray);
        navigate('/dashboard');

        // useEffect(() => {
        fetch('http://localhost:8080/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "appliances": appArray,
                "time": timeArray,
                "user": { "uid": user.uid },
                "emailVerified": user.emailVerified,
                "wattage": wattArray
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        // }, [appArray, timeArray, wattArray]);


    }

    return (
        <div>
            <Navbar item1="Dashboard" item2="Guide" item3="Predict" item4="Pay" item5="About" />
            <div className="form-wrap">
                <div className="form-container">
                    {
                        inputList.map((x, i) => {
                            return (
                                <div className="inputFields">
                                    <div className="input1" >
                                        <label for="appName" className="labelling">Appliance type</label>
                                        <select id="appName" name="appName" onChange={e => handleinputchange(e, i)} required>
                                            <option value="WashingMachine">Washing Machine</option>
                                            <option value="Refrigerator">Refrigerator</option>
                                            <option value="Television">Television</option>
                                            <option value="MobilePhoneCharging">Mobile Phone Charging</option>
                                            <option value="LaptopCharging">Laptop Charging</option>
                                            <option value="MixerGrinder">Mixer Grinder</option>
                                            <option value="Iron">Iron</option>
                                            <option value="Fan">Fan</option>
                                            <option value="AC">Air Conditioner</option>
                                            <option value="Light">Lights</option>
                                            <option value="Heater">Heater</option>
                                        </select>
                                    </div>
                                    <div className="input2">
                                        <label for="hours">Average no of hours</label>
                                        <input type="number" id="hours" name="hours" onChange={e => handleinputchange(e, i)} required />
                                    </div>
                                    <div className="input3">
                                        <label for="wattage">Wattage (optional)</label>
                                        <input type="number" id="wattage" name="wattage" onChange={e => handleinputchange(e, i)} required />
                                    </div>
                                    {
                                        inputList.length !== 1 &&
                                        <div className="remove">
                                            <button className="remove-button" onClick={() => handleRemoveField(i)}>Remove</button>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    <div className="addFields">
                        <button className="add-button" onClick={handleAddField}>Add a new appliance +</button>
                    </div>
                </div>
                <div className="submitBtn">
                    <button className="submit-button" onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default Analyze;