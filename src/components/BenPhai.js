import React, { useState, useContext, useEffect } from 'react';
import firebase from '../config/firebase'
import mcontext from '../Context'
import { DataGrid } from '@material-ui/data-grid';

export default function (props) {

    let context = useContext(mcontext)
    let [name, setName] = useState('')
    let [amount, setAmount] = useState('')
    let [history, setHistory] = useState([])
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
        const ref = firebase.database().ref('account/' + user.username)
        const snap = await (await ref.once('value')).val()
        let aiNo = snap.aiNo || []
        let history = snap.history || []
        let index = aiNo.findIndex(e => e.name.toUpperCase() == name.toUpperCase())
        if (index !== -1) {
            aiNo[index].amount += Number(amount)
        } else {
            aiNo.push({ name: name, amount: Number(amount), date: new Date() })
        }
        user.aiNo = aiNo
        let dat = new Date();
        history.unshift({
            name: name, amount: Number(amount),
            date: dat.getHours() + ':' + dat.getMinutes() + ' ' + dat.getDate() + '-' + (dat.getMonth() + 1) + '-' + dat.getFullYear(),
            type: 'out'
        })
        user.history = history
        ref.set(user)
        context.setUser({ ...user })
    }
    let onNoAi = async function () {
        if (!name || !amount) {
            alert('Bạn chưa nhập ' + name ? 'tên' : 'số tiền')
            return
        }
        const user = context.user
        const ref = firebase.database().ref('account/' + user.username)
        const snap = await (await ref.once('value')).val()
        let noAi = snap.noAi || []
        let history = snap.history || []
        let index = noAi.findIndex(e => e.name.toUpperCase() == name.toUpperCase())
        if (index !== -1) {
            noAi[index].amount += Number(amount)
        } else {
            noAi.push({ name: name, amount: Number(amount), date: new Date() })
        }
        user.noAi = noAi
        let dat = new Date();
        history.unshift({
            name: name, amount: Number(amount),
            date: dat.getHours() + ':' + dat.getMinutes() + ' ' + dat.getDate() + '-' + (dat.getMonth() + 1) + '-' + dat.getFullYear(),
            type: 'in'
        })
        user.history = history
        ref.set(user)
        context.setUser({ ...user })
    }
    useEffect(function () {
        setHistory(context.user.history)
    }, [context.user])
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Tên', width: 130 },
        { field: 'amount', headerName: 'Số tiền', width: 130 },
        {
            field: 'date',
            headerName: 'Ngày thực hiện',
            // type: 'string',
            width: 150,
        },
        {
            field: 'type',
            headerName: 'Vay/cho vay',
            description: 'This column has a value getter and is not sortable.',
            // sortable: false,
            width: 160,
            valueGetter: (params) =>
                // `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
                // {console.log('param: ', params)}
                params.getValue('type') == 'in'?'Vay':'Cho vay'
        },
    ];
    let data = (history||[]).map((e, p)=>{
        return {
            ...e,
            id: p
        }
    })
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
                        <button type='reset' className='btn btn-primary ml-3' onClick={onAiNo.bind(this)}><i>Ai nợ</i></button>
                        <button type='reset' className='btn btn-primary ml-3' onClick={onNoAi.bind(this)}><i>Nợ ai</i></button>

                    </div>
                </form>
                <div id='history' className='mt-3' style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={data} columns={columns} pageSize={5} />
                </div>
            </div>
        </div>
    )
}
