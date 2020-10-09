import React, { useContext, useEffect, useState } from 'react';
import mcontext from '../Context'


export default function () {
    let context = useContext(mcontext)
    // let aiNo = context.user.aiNo || []
    let [aiNo, setAiNo] = useState(context.user.aiNo||[])
    let deleteAiNo = function (key) {
        let user = context.user
        delete user.aiNo
        context.setUser(user)
    }
    return (
        <div className="card" id='benTren'>
            <div className="card-header"><b>Ai nợ</b></div>
            <div className="card-body">
                {
                    aiNo.map((e, k) => (
                        <div key={k} className='row col-md-12'>
                            <div className='col-md-4'>{e.name}</div>
                            <div className='col-md-6'>{e.amount}$</div>
                            <div className='col-md-2' ><button onClick={deleteAiNo.bind(this, k)}><i className="fa fa-trash" aria-hidden="true"></i></button></div>
                        </div>
                    ))
                }
            </div>
            <div className="card-footer">Footer</div>
        </div>
    )
}