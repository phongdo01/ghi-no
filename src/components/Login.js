import React, { Component, useState } from 'react';
import * as firebase from 'firebase';
import config from '../config/firebase'
import '../Login.css'

var bcrypt = require('bcryptjs');


firebase.initializeApp(config);
const submit = function (username, password) {
    console.log('username: ', username)
    console.log('password: ', password)
    const ref = firebase.database().ref('account')
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    ref.set({
        name: username,
        password: hash
    })
}
const Login = (props) => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    // let getOnChange = function(e) {

    // }
    function getOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        if (name === 'username') {
            setUsername(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
    }
    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" name="username" placeholder="username" onChange={getOnChange.bind(this)} />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" name="password" placeholder="password" onChange={getOnChange.bind(this)} />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
					            </div>
                                <div className="form-group">
                                    <input type="button" value="Login" className="btn float-right login_btn" onClick={submit.bind(this, username, password)} />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="#">Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
// export default Login;