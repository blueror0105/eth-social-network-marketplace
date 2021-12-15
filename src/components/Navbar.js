import React from 'react';
import Identicon from 'identicon.js';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
            >
                Dapp University
            </a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <small className="text-secondary">
                        <small id="account">{props.account}</small>
                        {
                            props.account ?
                                <img className="ml-2"
                                    width="30"
                                    height="30"
                                    src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
                                /> :
                                <span></span>
                        }
                    </small>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;