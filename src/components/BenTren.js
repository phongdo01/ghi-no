import React, { useContext, useEffect, useState } from 'react';
import mcontext from '../Context'
import firebase from '../config/firebase'
import NumberFormat from 'react-number-format';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



let TraTien = (props) => {
    let [open, setOpen] = useState(false)
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();
    function onClose(){
        props.closeModal()
    }
    useEffect(()=>{
        setOpen(open)
    }, [props.open])
    console.log('open: ', props)
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={()=>onClose()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            ></Modal>
            <Fade in={props.open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Transition modal</h2>
                    <p id="transition-modal-description">react-transition-group animates me.</p>
                </div>
            </Fade>
        </div>
    )
}

export default function (props) {
    let context = useContext(mcontext)
    // let aiNo = context.user.aiNo || []
    let [aiNo, setAiNo] = useState(context.user.aiNo || [])
    let [open, setOpen] = useState(false)
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
    function openModal(){
        console.log('vao day')
        setOpen(true)
    }
    function closeModal(){
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
                                <span onClick={()=>openModal()}><i className="fa fa-credit-card" aria-hidden="true"></i></span>
                                <span onClick={deleteAiNo.bind(this, k)} className='ml-1'><i className="fa fa-trash" aria-hidden="true"></i></span>
                            </div>
                            {/* <div className='col-md-2' ><span onClick={deleteAiNo.bind(this, k)}><i className="fa fa-trash" aria-hidden="true"></i></span></div> */}
                            {/* <div className='col-md-2' ><span onClick={deleteAiNo.bind(this, k)}><i className="fa fa-credit-card" aria-hidden="true"></i></span></div> */}
                        </div>
                    ))
                }
                {/* {TraTien(open, closeModal)} */}
                <TraTien
                    open = {open}
                    closeModal = {closeModal.bind(this)}

                />
            </div>
            {/* <div className="card-footer">Footer</div> */}
        </div>
    )
}
