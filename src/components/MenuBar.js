import React from 'react';
export default function menuBar({user}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="a">Navbar w/ text</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="b">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="c">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="d">Pricing</a>
                    </li>
                </ul>
                <span className="navbar-text">
                    Xin chào {user.last_name}
                </span>
            </div>
        </nav>
    )
}