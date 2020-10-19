import React from 'react';
// import Context from '../Context';
export default function menuBar({ user }) {
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

                </span>
                <ul className="navbar-nav">
                    <li className="dropdown">
                        <a className="dropdown-toggle dropdown-menu-left" data-toggle="dropdown" href="#">Xin chào {user.first_name}
                        <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a href="#">Đăng xuất</a></li>
                            <li><a href="#">Page 1-2</a></li>
                            <li><a href="#">Page 1-3</a></li>
                        </ul>
                    </li>
                </ul>

            </div>
        </nav>
    )
}