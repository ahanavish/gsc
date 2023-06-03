import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { googleSignIn, user } = UserAuth();
    const [successValue, setsuccessValue] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            console.log(user, 'user-before');
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            console.log(user.uid, 'uid');
            fetch(('http://localhost:8080/isexist?uid=' + user.uid), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.status, 'status-value')
                    setsuccessValue(data.status)
                })
                .catch(error => console.error(error));
        }
    }, []);

    console.log(successValue, 'status');
    if (successValue)
        navigate('/dashboard');
    else
        navigate('/signin2');

    return (
        <div className="form">
            <div className="form-wrapper">
                <form action="#">
                    <h1>Sign Up/ Sign In </h1>
                    <div className="social">
                        <GoogleButton type="dark" onClick={handleGoogleSignIn} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;