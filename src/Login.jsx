import React from "react";
import { Redirect } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

function Login() {
    return (
        <div className="form">
            <div className="form-wrapper">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social">
                        <GoogleOAuthProvider clientId='195165307652-m8iq8lcsi1obfn4c6nt77cme3ah2a1ap.apps.googleusercontent.com'>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const details = jwt_decode(credentialResponse.credential);
                                    console.log(credentialResponse);

                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </GoogleOAuthProvider>
                    </div>
                    {/* <span>Already have an account?</span>
                    <input type="email" placeholder="Enter your email"></input>
                    <input type="password" placeholder="password"></input>
                    <a href="#">Forgot your password?</a>
                    <button>Sign in</button> */}
                </form>
            </div>
        </div>
    );
}

export default Login;