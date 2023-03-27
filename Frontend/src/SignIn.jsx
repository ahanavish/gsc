import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { googleSignIn, user } = UserAuth();
    const [successValue, setsuccessValue] = useState(false);
    let navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            console.log(user);
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (user != null) {
            fetch('http://localhost:8080/isexist', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status)
                    setsuccessValue(data.status)
                })
                .catch(error => console.error(error));

            console.log(successValue);
            successValue === true &&
                navigate('/dashboard');
            successValue === false &&
                navigate('/signin2');
        }
    }, [user]);

    return (
        <div className="form">
            <div className="form-wrapper">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social">
                        <GoogleButton type="dark" onClick={handleGoogleSignIn} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;