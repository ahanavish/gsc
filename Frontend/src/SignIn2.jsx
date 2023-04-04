import React, { useEffect, useState } from "react";
import { UserAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn2() {
    let navigate = useNavigate();
    // const [stateValue, setstateValue] = useState("");
    // const [membersValue, setmembersValue] = useState("");
    const { user } = UserAuth();

    const handleProceed = () => {
        let x = document.forms["signin2form"]["state"].value;
        // setstateValue(x);
        let y = document.forms["signin2form"]["familymembers"].value;
        // setmembersValue(y);
        if (x === "" || y === "") {
            alert("All fields must be filled out");
            return false;
        }

        var exists = null;
        fetch('http://localhost:8080/initial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "state": x,
                "members": y,
                "user": { "uid": user.uid, "name": user.displayName, "email": user.email },
                "emailVerified": user.emailVerified
            })
        })
            .then(response => response.json())
            .then(data => {
                exists = data;
            })
            .catch(error => console.error(error));

        navigate('/dashboard');
    }

    return (
        <div className="form">
            <div className="form-wrapper2">
                <form action="#" name="signin2form">
                    <h1>Hey, {user.displayName}!</h1>
                    <h4>We need to know a little more about you.</h4>
                    <div className="inputs">
                        <label for="state">Which state do you live in?</label>
                        <select name="state" id="state" required>
                            <option value="AndhraPradesh">Andhra Pradesh</option>
                            <option value="ArunachalPradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gjarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="HimachalPradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="MadhyaPradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamilnadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="UttarPradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="WestBengal">West Bengal</option>
                        </select>

                        <label for="familymembers">How many people do you have in your family?</label>
                        <input type="number" id="familymembers" name="familymembers" min="1" required></input>
                    </div>
                    <div className="submitBtn">
                        <button onClick={handleProceed}>Proceed</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn2;