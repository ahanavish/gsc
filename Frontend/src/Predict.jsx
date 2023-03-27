import React from "react";
import Navbar from "./Navbar";
import { UserAuth } from './context/AuthContext';

function Predict() {
    const { user } = UserAuth();

    const func = async () => {
        await fetch('http://localhost:8080/inference', {
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
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return (
        <div>
            <Navbar></Navbar>
            <button className="btn" onClick={func}>gbgb</button>
        </div>
    );
}

export default Predict;