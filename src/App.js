import React from 'react';
import './App.css';
import Login from './components/Login'
import Regist from './components/Regist'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Login /> */}
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/regist">
            <Regist/>
          </Route>
          <Route path="/">
            {() => (<h2>home</h2>)}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
