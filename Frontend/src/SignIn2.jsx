import React, { useEffect, useState } from "react";
import { UserAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn2() {
    let navigate = useNavigate();
    const [stateValue, setstateValue] = useState("");
    const [membersValue, setmembersValue] = useState("");
    const { user } = UserAuth();

    const handleProceed = () => {
        let x = document.forms["signin2form"]["state"].value;
        setstateValue(x);
        let y = document.forms["signin2form"]["familymembers"].value;
        setmembersValue(y);
        if (x == "" || y == "") {
            alert("All fields must be filled out");
            return false;
        }

        if (user != null) {
            var a = null;
            fetch('http://localhost:8080/initial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "state": { stateValue },
                    "members": { membersValue },
                    "user": { "uid": user.uid, "name": user.displayName, "email": user.email },
                    "emailVerified": user.emailVerified
                })
            })
                .then(response => response.json())
                .then(data => {
                    a = data;
                })
                .catch(error => console.error(error));

            if (a === true)
                navigate('/dashboard');
        }

        console.log(stateValue);
        navigate('/dashboard');
    }

    useEffect(() => {

    }, [user]);

    return (
        <div className="form">
            <div className="form-wrapper2">
                <form action="#" name="signin2form">
                    <h1>Hey, {user.displayName}!</h1>
                    <h4>We need to know a little more about you.</h4>
                    <div className="inputs">
                        <label for="state">Which state do you live in?</label>
                        <select name="state" id="state" required>
                            <option value="andhrapradesh">Andhra Pradesh</option>
                            <option value="arunachalpradesh">Arunachal Pradesh</option>
                            <option value="assam">Assam</option>
                            <option value="bihar">Bihar</option>
                            <option value="chhattisgarh">Chhattisgarh</option>
                            <option value="goa">Goa</option>
                            <option value="gujarat">Gujarat</option>
                            <option value="haryana">Haryana</option>
                            <option value="himachalpradesh">Himachal Pradesh</option>
                            <option value="jharkhand">Jharkhand</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="kerala">Kerala</option>
                            <option value="madhyapradesh">Madhya Pradesh</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="manipur">Manipur</option>
                            <option value="meghalaya">Meghalaya</option>
                            <option value="mizoram">Mizoram</option>
                            <option value="nagaland">Nagaland</option>
                            <option value="odisha">Odisha</option>
                            <option value="punjab">Punjab</option>
                            <option value="rajasthan">Rajasthan</option>
                            <option value="sikkim">Sikkim</option>
                            <option value="tamilnadu">Tamil Nadu</option>
                            <option value="telangana">Telangana</option>
                            <option value="tripura">Tripura</option>
                            <option value="uttarpradesh">Uttar Pradesh</option>
                            <option value="uttarakhand">Uttarakhand</option>
                            <option value="westbengal">West Bengal</option>
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