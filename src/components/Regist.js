import React, { useState } from 'react'
import firebase from '../config/firebase'

var bcrypt = require('bcryptjs');


function checkInput(data) {
    const fieldEmpty = !data.first_name||!data.last_name||!data.username||!data.password||!data.password_confirmation
    if (fieldEmpty) {
        return 'Điền đầy đủ thông tin các trường'
    }
    const patt = /\W/g
    if (data.password !== data.password_confirmation) {
        return 'Mật khẩu không trùng nhau'
    }
    if (patt.test(data.username)) {
        return 'Tên đăng nhập không được chứa ký tự đặc biệt'
    }
    // kiem tra trung ten tai khoan?
    const ref = firebase.database().ref('account')
    ref.orderByKey().equalTo(data.username).on('child_added', snap=>{
        console.log('pong: ',snap.val())
    })
    return 'ahihi'
}

const Component = (props) => {
    let [data, setData] = useState({})
    let [err, setErr] = useState('')
    function getOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setData({
            ...data,
            [name]: value
        })
    }
    function submitData(data) {
        const err = checkInput(data)
        if (err) {
            setErr(err)
            return
        }
        const ref = firebase.database().ref('account')
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        data.password = hash
        delete data.password_confirmation
        ref.child(data.username).set({
            data
        })
    }
    return (
        <div className="container col-md-6">
            <div className="centered-form">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Đăng ký với chúng tôi <small>Hoàn toàn miễn phí!</small></h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="first_name" id="first_name" className="form-control input-sm" placeholder="First Name" onChange={e => getOnChange(e)} />
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="last_name" id="last_name" className="form-control input-sm" placeholder="Last Name" onChange={e => getOnChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="username" name="username" id="username" className="form-control input-sm" placeholder="Type your username" onChange={e => getOnChange(e)} />
                            </div>
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="password" name="password" id="password" className="form-control input-sm" placeholder="Password" onChange={e => getOnChange(e)} />
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password" onChange={e => getOnChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: err ? 'block' : 'none' }}>
                                <small style={{ color: 'red' }}>{err}</small>
                            </div>
                            <input type="reset" defaultValue="Đăng ký" className="btn btn-info btn-block" onClick={() => submitData(data)} />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Component