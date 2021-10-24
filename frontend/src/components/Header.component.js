import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"

import userActions from "../redux/user/user.actions"

import "../styles/components/Header.scss";

const Header = () => {
    const dispatch = useDispatch()
    const [navOpen, setNavOpen] = useState(false)

    const user = useSelector(store => store.user.user);

    const onLogoutClick = () => {
        dispatch(userActions.logout("/"))
    }

    const toggleNav = () => setNavOpen(!navOpen)

    return (
        <header className="header">
            <div className="header__content">
                <div className="header__title">
                    <Link to="/">GuessThePerson</Link>
                </div>

                <nav className={`header__navigation ${navOpen ? "header__navigation--open" : ""}`}>


                <button className="header__menu-btn" onClick={toggleNav}>
                    <div className="header__btn-bars">
                        <div className="header__btn-bar header__btn-bar--1"></div>
                        <div className="header__btn-bar header__btn-bar--2"></div>
                        <div className="header__btn-bar header__btn-bar--3"></div>
                    </div>
                </button>

                <div className="header__links">
                    {user ? 
                        <React.Fragment>
                            <Link className="header__link" to="/">Home</Link>
                            <Link className="header__link" to="/people">People</Link>
                            <Link className="header__link" to="/boards">Boards</Link>
                            <button className="header__link" onClick={onLogoutClick}>Logout</button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link className="header__link" to="/login">Login</Link>
                            <Link className="header__link" to="/register">Register</Link>
                        </React.Fragment>
                    }
                </div>
                 
                </nav>      
            </div>
        </header>
    )
}

export default Header;