import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userActions from "../redux/user/user.actions"

const Header = () => {
    const dispatch = useDispatch()

    const user = useSelector(store => store.user.user);

    const onLogoutClick = () => {
        dispatch(userActions.logout())
    }

    return (
        <header>
            User: {user && user.name}

            <button onClick={onLogoutClick}>Logout</button>
        </header>
    )
}

export default Header;