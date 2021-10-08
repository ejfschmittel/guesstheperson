import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput.component'
import {useDispatch, useSelector} from "react-redux"
import userActions from "../redux/user/user.actions"
import PrimaryButton from "./PrimaryButton"
import PrimaryFormErrorField from "./PrimaryFormErrorField"

const Register = () => {
    const dispatch = useDispatch()
    const userRegisterPending = useSelector(store => store.user.registerUserPending)
    const userRegisterError = useSelector(store => store.user.registerUserError)

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(userActions.register(registerData))
    }

    
    return (

        <div className="wholescreen-flex">
            <div className="wholescreen-flex__container hero-card">
                <h1 className="hero-card__title">Register</h1>

                <form className="hero-card__section">
                    <PrimaryFormErrorField errorMessage={userRegisterError?.primaryMessage}/>
                    <FormInput label="Email" id="email" name="email" value={registerData.email} onChange={onChange}/>
                    <FormInput label="Username" id="name" name="name"  value={registerData.name} onChange={onChange}/>
                    <FormInput label="Password" id="password" name="password" type="password" value={registerData.password} onChange={onChange}/>
                    <PrimaryButton onClick={onSubmit} isLoading={userRegisterPending}>Register</PrimaryButton>
                </form>
                <div className="hero-card__section hero-card__section--border">
                    Already have an account? <Link to="/login">Login</Link> to create a board.
                </div>
            </div>
        </div>
    )
}

export default Register