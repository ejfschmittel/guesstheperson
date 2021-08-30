import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userActions from "../redux/user/user.actions"
import "../styles/components/Header.scss";
import {Link} from "react-router-dom"

const Header = () => {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user.user);

    const onLogoutClick = () => {
        dispatch(userActions.logout())
    }

    return (
        <header className="header">
            <div className="header__content">
                <div className="header__title">
                    GuessThePerson
                </div>
                <nav className="header__navigation">


                    {user ? 
                        <React.Fragment>
                            <button className="header__link" onClick={onLogoutClick}>Logout</button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link className="header__link" to="/login">Login</Link>
                            <Link className="header__link" to="/register">Register</Link>
                        </React.Fragment>
                    }

                    
                </nav>      
            </div>
        </header>
    )
}

export default Header;