import React, { useState, useEffect } from 'react';
import { googleLogout, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";
import axios from 'axios';

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
                    <Link to="/dashboard">
                        <button>Dashboard</button>
                    </Link>
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

// function App() {
//     const [user, setUser] = useState([]);
//     const [profile, setProfile] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => setUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     useEffect(
//         () => {
//             if (user) {
//                 axios
//                     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                         headers: {
//                             Authorization: `Bearer ${user.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         setProfile(res.data);
//                     })
//                     .catch((err) => console.log(err));
//             }
//         },
//         [user]
//     );

//     // log out function to log the user out of google and set the profile array to null
//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//     };

//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             {profile ? (
//                 <div>
//                     <img src={profile.picture} alt="user image" />
//                     <h3>User Logged in</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <button onClick={logOut}>Log out</button>
//                 </div>
//             ) : (
//                 <button onClick={() => login()}>Sign in with Google 🚀 </button>
//             )}
//         </div>
//     );
// }
// export default App;