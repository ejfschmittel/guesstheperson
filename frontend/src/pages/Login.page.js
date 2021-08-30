import React from 'react'
import Login from '../components/Login.component'
import Header from '../components/Header.component'

const LoginPage = () => {
    return (
        <div className="page page--fullscreen page--flex" >
            <Header />
        
            <div className="page__content page__content--flex-center">
                <Login />
            </div>
        </div>
    )
}

export default LoginPage