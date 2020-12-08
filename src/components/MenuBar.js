import React from 'react';
// import Context from '../Context';
export default function menuBar({ user }) {
    const logOut = function() {
        localStorage.clear();
        window.location.href = '/';
    }
    const dsCo = function(e) {
        e.preventDefault()
        let element = document.getElementById('id-menu')
        let liElement = element.getElementsByTagName('li')
        const leng = liElement.length
        for (let i=0; i<leng; i++) {
            liElement[i].classList.remove('active')
        }
        // element.classList.remove('active')
        // element = document.getElementById('tab2')
        // element.classList.add('active')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="a"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="nav nav-tabs mr-auto" id='id-menu'>
                    <li className="nav-item">
                        <a className="nav-link active" href="#profile" role="tab" data-toggle="tab" id="tab1">Vay/nợ <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" role="tab" data-toggle="tab" href="#buzz" id="tab2">Danh sách cỗ</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" role="tab" data-toggle="tab" id="tab3" href="#references">Giới thiệu</a>
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
                            <li><a href="#" onClick={logOut}>Đăng xuất</a></li>
                        </ul>
                    </li>
                </ul>

            </div>
        </nav>
    )
}