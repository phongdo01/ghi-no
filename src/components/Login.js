import React, { Component, useContext, useState } from 'react';
import config from '../config/firebase'
import context from '../Context'
import firebase from '../config/firebase'
var bcrypt = require('bcryptjs');

const Login = (props) => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [err, setErr] = useState('')
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
    const submit = async function (username, password) {
        const ref = firebase.database().ref('account').orderByKey().equalTo(username)
        const snap = await ref.once('value')
        if (!snap) {
            setErr('Người dùng không tồn tại')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        bcrypt.compareSync(password, hash)
        alert('Đăng nhập thành công')
        return ''
    }
    return (
        <div className="container col-md-4">
            <h2>Đăng nhập</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" onChange={getOnChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Mật khẩu:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" onChange={getOnChange.bind(this)} />
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
                    <button type="reset" className="btn btn-primary" onClick={submit.bind(this, username, password)}>Đăng nhập</button>
                </div>
            </form>
        </div>
    )
}

export default Login;