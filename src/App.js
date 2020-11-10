import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
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
  
  let [user, setUser] = useState('')
  useEffect(function(){
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])
  return user?renderWhenLogined({user, setUser}):renderWhenNotLogin({user, setUser})
}
function renderWhenNotLogin({user, setUser}) {
  return (
    <context.Provider value={{ user: user, setUser: (u) => setUser(u) }}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />
          {/* <Route path="/debit" component={MainScr} /> */}
          <Route path="/" component={()=>(<Redirect to='/login'/>)} />
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
          <Route path="/debit" component={MainScr} />
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />
        </Switch>
      </Router>
    </context.Provider>
  )
}
export default App;
