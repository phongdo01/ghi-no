import React, { useState, useContext } from 'react';
import firebase from '../config/firebase'
import mcontext from '../Context'

export default function (props) {
    let context = useContext(mcontext)
    let [name, setName] = useState('')
    let [amount, setAmount] = useState('')
    let getOnChange = function (e) {
        const name = e.target.name
        const value = e.target.value
        switch (name) {
            case 'name': setName(value)
                break
            case 'amount': setAmount(value)
                break
        }
    }
    let onAiNo = async function () {
        if (!name || !amount) {
            alert('Bạn chưa nhập ' + name ? 'tên' : 'số tiền')
            return
        }
        const user = context.user
        const ref = firebase.database().ref('account/'+user.username)
        const snap = await (await ref.once('value')).val()
        let aiNo = snap.aiNo||[]
        let index = aiNo.findIndex(e=>e.name.toUpperCase() == name.toUpperCase())
        if (index !== -1) {
            aiNo[index].amount+=Number(amount)
        } else {
            aiNo.push({name: name, amount: Number(amount),date: new Date()})
        }
        user.aiNo = aiNo
        ref.set(user)
        context.setUser({...user})
    }
    return (
        <div className="card" style={{ height: '100%' }}>
            <div className="card-header">Thông tin</div>
            <div className="card-body">
                <form>
                    <div className='row form-inline'>
                        <span>Tên:</span>
                        <input className='form-control ml-2' name='name' onChange={getOnChange.bind(this)} />
                        <span className='ml-3'>Số tiền</span>
                        <input type='number' className='form-control ml-2' name='amount' onChange={getOnChange.bind(this)} />
                        {/* <button className='btn btn-primary ml-2'>Thêm</button> */}
                        <button type='reset' className='btn btn-primary ml-2' onClick={onAiNo.bind(this)}><i>Ai nợ</i></button>
                        <button type='reset' className='btn btn-primary ml-2' onClick={onAiNo.bind(this)}><i>Nợ ai</i></button>
                    </div>
                </form>
            </div>
            <div className="card-footer">Footer</div>
        </div>
    )
}
