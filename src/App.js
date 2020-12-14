import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Regist from './components/Regist'
import MainScr from './components/Debit'
import context from './Context'
import firebase from './config/firebase'
import { useBeforeunload } from 'react-beforeunload';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  let [user, setUser] = useState('')
  let didMount = async () => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) return;
    const ref = firebase.database().ref('account/' + user.username)
    const snap = await (await ref.once('value')).val()
    setUser(snap)
  }
  useEffect(function () {
    didMount()
  }, [])
  console.log('user: ', user)
  return user ? renderWhenLogined({ user, setUser }) : renderWhenNotLogin({ user, setUser })
}
function renderWhenNotLogin({ user, setUser }) {
  return (
    <context.Provider value={{ user: user, setUser: (u) => setUser(u) }}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Regist} />
          {/* <Route path="/debit" component={MainScr} /> */}
          <Route path="/" component={() => (<Redirect to='/login' />)} />
        </Switch>
      </Router>
    </context.Provider>
  )
}
function renderWhenLogined({ user, setUser }) {
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
