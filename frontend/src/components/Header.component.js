import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {

    const user = useSelector(store => store.user.user);

    return (
        <header>
            User: {user && user.name}
        </header>
    )
}

export default Header;