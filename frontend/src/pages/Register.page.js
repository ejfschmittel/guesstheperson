import React from 'react'
import Register from '../components/Register.component'
import Header from "../components/Header.component"
const RegisterPage = () => {
    return (
        <div className="page page--fullscreen page--flex">
            <Header />
            <div className="page__content page__content--flex-center">
                <Register />
            </div>
        </div>
    )
}

export default RegisterPage