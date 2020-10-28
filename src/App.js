import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login'
import Regist from './components/Regist'
import MainScr from './components/Debit'
import context from './Context'
import { useBeforeunload } from 'react-beforeunload';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  
  useBeforeunload((event) => event.preventDefault());
  let [user, setUser] = useState('')
  useEffect(function(){
    setUser(JSON.parse(localStorage.getItem('user')))
    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Older browsers supported custom message
      event.returnValue = '';
    });
  }, [])
  return user?(renderWhenLogined({user, setUser})):(renderWhenNotLogin({user, setUser}))
}
function renderWhenNotLogin({user, setUser}) {
  return (
    <context.Provider value={{ user: user, setUser: (u) => setUser(u) }}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />
          {/* <Route path="/debit" component={MainScr} /> */}
          <Route path="/" component={()=>(<a href='/login'>home</a>)} />
        </Switch>
      </Router>
    </context.Provider>
  )
}
function renderWhenLogined({user, setUser}) {
  return (
    <context.Provider value={{ user: user, setUser: (u) => setUser(u) }}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />
          <Route path="/debit" component={MainScr} />
        </Switch>
      </Router>
    </context.Provider>
  )
}
export default App;
