import React, { useState, useContext, useEffect } from 'react';
import firebase from '../../config/firebase'
import mcontext from '../../Context'
import { DataGrid } from '@material-ui/data-grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function (props) {
    let context = useContext(mcontext)
    let [name, setName] = useState('')
    let [amount, setAmount] = useState('')
    let [history, setHistory] = useState([])
    let [search, setSearch] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    let getOnChange = function (e) {
        const name = e.target.name
        const value = e.target.value
        switch (name) {
            case 'name': setName(value)
                break
            case 'amount': setAmount(value)
                break
            case 'search': setSearch(value)
                break
        }
    }

    let onSubmit = async function (){
        if(name == '' || name == null){
            alert('Bạn chưa nhập tên')
        }
        else if(amount == '' || name == amount){
            alert('Bạn chưa nhập số tiền')
        }
        else {
            const user = context.user
            const ref = firebase.database().ref('account/' + user.username)
            const snap = await (await ref.once('value')).val()
            let subMit = snap.subMit || []
            let history = snap.history || []
            let index = subMit.findIndex(e => e.name.toUpperCase() == name.toUpperCase())
            if (index !== -1) {
                subMit[index].amount += Number(amount)
            } else {
                subMit.push({ name: name, amount: Number(amount), date: startDate })
            }
            user.subMit = subMit
            history.unshift({
            name: name, amount: Number(amount),
            date: startDate,
        })
        user.history = history
        ref.set(user)
        context.setUser({ ...user })
        }
    }

    let dataCo = (history || []).map((e, p) => {
        return {
            ...e,
            id: p
        }
    })
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Tên', width: 130 },
        { field: 'amount', headerName: 'Số tiền', width: 130 },
        {
            field: 'date',
            headerName: 'Ngày thực hiện',
            // type: 'string',
            width: 150,
        }
    ];
    let dtCo = dataCo.filter(e => e.name.toUpperCase().includes(search.toUpperCase()))
    return (
        <div className="card" style={{ height: '100%' }}>
            <div className="card-header col-md-12">
                Thông tin
                <div id='search' className='col-md-3 d-inline row'>
                    <input type='text' className='form-control float-right col-md-3' placeholder='Lọc theo tên' name='search' />
                </div>
            </div>
            <div className="card-body">
                <form>
                    <div className='row form-inline' id='thong-tin'>
                        <span>Tên:</span>
                        <input className='form-control ml-2 col-md-2' name='name' onChange={getOnChange.bind(this)}/>
                        <span className='ml-3'>Số tiền:</span>
                        <input type='number' className='form-control ml-2 col-md-2' name='amount' onChange={getOnChange.bind(this)}/>
                        <span className='ml-3'>Ngày thực hiện:</span>
                        <div id='dateCo' style={{zIndex:'999'}}>
                            <DatePicker className='ml-3' selected={startDate} name='dateCo' onChange={date => setStartDate(date)} />
                        </div>
                        <div className='inline' id='btn-grp'>
                            <button type='reset' className='btn btn-primary ml-3 btn2' onClick={onSubmit.bind(this)}><i>Xác nhận</i></button>
                        </div>
                    </div>
                </form>
            </div>
            <div id='history' className='mt-3' style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={dtCo} columns={columns} pageSize={5} />
            </div>
        </div>
    )
}