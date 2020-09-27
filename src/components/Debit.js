import React, { Component, useContext, useEffect, useState } from 'react';
import config from '../config/firebase'
import mcontext from '../Context'
import firebase from '../config/firebase'
import { Redirect } from "react-router-dom";

export default function () {
    let context = useContext(mcontext)
    useEffect(function () {

    })
    return context.user ? (
        <div className='container col-md-12 row'>
            <div className='col-md-4'>
                <div className="card">
                    <div className="card-header">Header</div>
                    <div className="card-body">Content</div>
                    <div className="card-footer">Footer</div>
                </div>
            </div>
            <div className='col-md-8'>
                <div className="card">
                    <div className="card-header">Header</div>
                    <div className="card-body">Content</div>
                    <div className="card-footer">Footer</div>
                </div>
            </div>
        </div>
    ) : <Redirect to='/login' />
}