import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Guide from './Guide';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './context/Protected';
import SignIn from './SignIn';
import SignIn2 from './SignIn2';
import Analyze from './Analyze';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AuthContextProvider>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/signin' element={<SignIn />} />
                        <Route exact path='/signin2' element={<Protected><SignIn2 /></Protected>} />
                        <Route exact path='/dashboard' element={<Protected><Dashboard /></Protected>} />
                        <Route exact path='/guide' element={<Protected><Guide /></Protected>} />
                        <Route exact path='/analyze' element={<Protected><Analyze /></Protected>} />
                    </Routes>
                </AuthContextProvider>
            </div>
        );
    }
}

export default App;