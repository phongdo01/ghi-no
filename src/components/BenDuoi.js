import React, { useContext, useEffect, useState } from 'react';
import mcontext from '../Context'
import firebase from '../config/firebase'
import NumberFormat from 'react-number-format';


export default function (props) {
    let context = useContext(mcontext)
    // let noAi = context.user.noAi || []
    let [noAi, setNoAi] = useState(context.user.noAi || [])
    // let noAi = context.user.noAi || []
    let deleteNoAi = function (key) {
        let user = context.user
        user.noAi.splice(key, 1)
        // delete user.noAi
        const ref = firebase.database().ref('account/' + user.username)
        ref.set(user)
        context.setUser(user);
        setNoAi([...user.noAi])
    }
    useEffect(function () {
        // console.log('noAi: ', noAi)
        const { user } = context
        user.noAi ? setNoAi([...user.noAi]) : setNoAi([])
        // setNoAi([...context.user.noAi]||[])
    }, [context.user])
    useEffect(function () {
        didMount()
    }, [])
    async function didMount() {
        const user = context.user
        const ref = firebase.database().ref('account/' + user.username)
        const snap = await (await ref.once('value')).val()
        const noAi = snap.noAi || []
        setNoAi(noAi)
    }
    const sum = noAi.reduce((total, e) => total + Number(e.amount), 0)
    return (
        <div className="card" id='benduoi'>
            <div className="card-header"><b>Nợ ai</b>:
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
                    noAi.map((e, k) => (
                        <div key={k} className='row col-md-12'>
                            <div className='col-md-4'>{e.name}</div>
                            <div className='col-md-6'>{e.amount}$</div>
                            <div className='col-md-2' ><span onClick={deleteNoAi.bind(this, k)}><i className="fa fa-trash" aria-hidden="true"></i></span></div>
                        </div>
                    ))
                }
            </div>
            {/* <div className="card-footer">Footer</div> */}
        </div>
    )
}