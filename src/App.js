import React, { useState } from 'react';
import './App.css';
import Login from './components/Login'
import Regist from './components/Regist'
import context from './Context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let [prjName, setPrjName] = useState(0)
  console.log('a')
  return (
    <context.Provider value={
      {
      prjName,
      changePrjName: ()=> setPrjName(prjName+1)
      }}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/regist">
            <Regist />
          </Route>
          <Route path="/">
            {() => (<h2>home</h2>)}
          </Route>
        </Switch>
      </Router>
    </context.Provider>
  );
}

export default App;
