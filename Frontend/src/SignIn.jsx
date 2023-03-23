import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate('/dashboard');
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