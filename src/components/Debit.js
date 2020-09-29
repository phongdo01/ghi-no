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
        <div className='container col-md-12'>
            {menuBar(context.user)}
            <div className='row  mt-2'>
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
        </div>
    ) : <Redirect to='/login' />
}

function menuBar(user) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar w/ text</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
                <span className="navbar-text">
                    Xin chào {user.last_name}
                </span>
            </div>
        </nav>


    )
}