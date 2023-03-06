import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        <Route exact path='/' element={<Home />}></Route>
                        <Route exact path='/login' element={<Login />}></Route>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;