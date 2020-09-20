import React, { Component, useState } from 'react';
import config from '../config/firebase'

var bcrypt = require('bcryptjs');


const submit = function (username, password) {
    
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
        <div className="container col-md-4">
            <h2>Đăng nhập</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Mật khẩu:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" />
                </div>
                <div className="form-group form-check d-inline-block">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Lưu mật khẩu
                    </label>
                </div>
                <div className="d-inline-block ml-4">
                <a href='/regist'>Đăng ký</a>
                </div>
                <div>
                <button type="submit" className="btn btn-primary">Đăng nhập</button>
                </div>
            </form>
        </div>
    )
}

export default Login
// export default Login;