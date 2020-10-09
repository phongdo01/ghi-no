import React, { useContext, useEffect, useState } from 'react';
import mcontext from '../Context'
import { Redirect } from "react-router-dom";
import MenuBar from './MenuBar'
import BenPhai from './BenPhai'
import BenTren from './BenTren'


export default function () {
    let context = useContext(mcontext)
    let user = context.user
    return user?(
        <div className='container col-md-12'>
            <MenuBar user={context.user} />
            <div className='row  mt-2'>
                <div className='col-md-4'>
                    <BenTren />
                    <div className="card mt-2" id='benDuoi'>
                        <div className="card-header">Header</div>
                        <div className="card-body">Content</div>
                        <div className="card-footer">Footer</div>
                    </div>
                </div>
                <div className='col-md-8' id='benphai'>
                    <BenPhai />
                    <button className='btn btn-primary' onClick={()=>context.setUser(user)}>click me</button>
                </div>
            </div>
        </div>
    ):<Redirect to='/login'/>
}

