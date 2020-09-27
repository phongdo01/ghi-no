import React, { useState } from 'react';
import './App.css';
import Login from './components/Login'
import Regist from './components/Regist'
import MainScr from './components/Debit'
import context from './Context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let [user, setUser] = useState('')
  return (
    <context.Provider value={{ user: user, setUser: (u)=>setUser(u)}}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />
          <Route path="/debit" component={MainScr} />
          <Route path="/" component={() => (<h2><a href='/login'>home</a></h2>)} />
        </Switch>
      </Router>
    </context.Provider>
  );
}

export default App;
