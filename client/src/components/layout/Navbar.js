import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ListContext from '../../context/list/listContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const listContext = useContext(ListContext);

    const { isAuthenticated, logout } = authContext;
    const { clearLists } = listContext;

    const onLogout = () => {
        logout();
        clearLists();
    };

    const authLinks = (
        <Fragment>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );


    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.prototype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'List Manager',
    icon: 'fas fa-cubes'
}

export default Navbar
