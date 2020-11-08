import React, { useContext, useEffect, useState } from 'react';
import mcontext from '../Context'
import firebase from '../config/firebase'
import NumberFormat from 'react-number-format';
import TraTien from './ModalThayDoi'


export default function (props) {
    let context = useContext(mcontext)
    // let aiNo = context.user.aiNo || []
    let [aiNo, setAiNo] = useState(context.user.aiNo || [])
    let [open, setOpen] = useState(false)
    let [data, setData] = useState('')
    // let aiNo = context.user.aiNo || []
    let deleteAiNo = function (key) {
        let user = context.user
        user.aiNo.splice(key, 1)
        // delete user.aiNo
        const ref = firebase.database().ref('account/' + user.username)
        ref.set(user)
        context.setUser(user);
        setAiNo([...user.aiNo])
    }
    useEffect(function () {
        // console.log('aiNo: ', aiNo)
        const { user } = context
        user.aiNo ? setAiNo([...user.aiNo]) : setAiNo([])
        // setAiNo([...context.user.aiNo]||[])
    }, [context.user])
    useEffect(function () {
        didMount()
    }, [])
    async function didMount() {
        const user = context.user
        const ref = firebase.database().ref('account/' + user.username)
        const snap = await (await ref.once('value')).val()
        const aiNo = snap.aiNo || []
        setAiNo(aiNo)
    }
    function openModal(e, k) {
        setOpen(true)
        setData({...e, type: 'AiNo', index: k})
    }
    function closeModal() {
        setOpen(false)
    }
    const sum = aiNo.reduce((total, e) => total + Number(e.amount), 0)
    return (
        <div className="card" id='bentren'>
            <div className="card-header">
                <b>Ai nợ</b>:
                <NumberFormat
                    value={sum}
                    displayType={'text'}
                    thousandSeparator={true}
                    style={{ float: 'right' }}
                    suffix={'$'}
                />
            </div>
            <div className="card-body">
                {
                    aiNo.map((e, k) => (
                        <div key={k} className='row col-md-12'>
                            <div className='col-md-4'>{e.name}</div>
                            {/* <div className='col-md-6'>{e.amount}$</div> */}
                            <div className='col-md-5'>
                                <NumberFormat
                                    value={e.amount}
                                    className='d-flex justify-content-end'
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            </div>
                            <div className='col-md-3'>
                                <span onClick={() => openModal(e, k)}><i className="fa fa-credit-card" aria-hidden="true"></i></span>
                                <span onClick={deleteAiNo.bind(this, k)} className='ml-1'><i className="fa fa-trash" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    ))
                }
               
                <TraTien open={open} closeModal={closeModal} data={data}/>
            </div>
            {/* <div className="card-footer">Footer</div> */}
        </div>
    )
}
