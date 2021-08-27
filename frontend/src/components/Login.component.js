import React from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput.component'

const Login = () => {
    return (

        <div className="wholescreen-flex">
            <div className="wholescreen-flex__container hero-card">
                <h1 className="hero-card__title">Login</h1>

                <form>
                    <FormInput label="Email" id="email" />
                    <FormInput label="Password" id="email" type="password" />
                    <button className="button button--center button--action">Login</button>
                </form>
                <div className="hero-card__section">
                    <Link to={"/register"} className="button button--center button--action">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login