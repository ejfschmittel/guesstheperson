import React from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput.component'

const Register = () => {
    return (

        <div className="wholescreen-flex">
            <div className="wholescreen-flex__container hero-card">
                <h1 className="hero-card__title">Register</h1>

                <form>
                    <FormInput label="Email" id="email" />
                    <FormInput label="Username" id="email"  />
                    <FormInput label="Password" id="email" type="password" />
                    <button className="button button--center button--action">Register</button>
                </form>
                <div className="hero-card__section">
                    <Link to={"/login"} className="button button--center button--action">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register