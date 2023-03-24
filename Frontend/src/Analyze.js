import React, { useState } from "react";
import Navbar from "./Navbar";
import { UserAuth } from './context/AuthContext';

function Analyze() {
    const { user } = UserAuth();

    const [inputList, setinputList] = useState([{ wattage: '', hours: '' }]);

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


    return (
        <div>
            <Navbar />
            <div className="form-wrap">
                <div className="form-container">
                    {
                        inputList.map((x, i) => {
                            return (
                                <div className="inputFields">
                                    <div className="input1" >
                                        <label for="appName" className="labeeling">Appliance type</label>
                                        <select id="appName" name="appName" onChange={e => handleinputchange(e, i)} required>
                                            <option value="washingmachine">Washing Machine</option>
                                            <option value="refrigerator">Refrigerator</option>
                                            <option value="television">Television</option>
                                            <option value="mobilephone">Mobile Phone</option>
                                            <option value="laptop">Laptop</option>
                                            <option value="mixergrinder">Mixer Grinder</option>
                                            <option value="iron">Iron</option>
                                            <option value="fan">Fan</option>
                                            <option value="airconditioner">Air Conditioner</option>
                                            <option value="lights">Lights</option>
                                            <option value="heater">Heater</option>
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
                    <button className="submit-button">SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default Analyze;