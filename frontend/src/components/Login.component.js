import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput.component'
import {useDispatch, useSelector} from "react-redux"
import userActions from "../redux/user/user.actions"
import PrimaryButton from './PrimaryButton'
import PrimaryFormErrorField from './PrimaryFormErrorField'
import { useParsedFieldErrors } from '../hooks/useParsedFieldError.hook'


const Login = () => {
    const dispatch = useDispatch()
    const loginPending = useSelector(store => store.user.userLoginPending)
    const loginError = useSelector(store => store.user.userLoginError)
    const parsedErrors = useParsedFieldErrors(loginError)


    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const onChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(userActions)
        dispatch(userActions.login(loginData))
    }



    return (

        <div className="wholescreen-flex">
            <div className="wholescreen-flex__container hero-card">
                <h1 className="hero-card__title">Login</h1>

                <form className="hero-card__section">
                    <PrimaryFormErrorField errorMessage={loginError?.primaryMessage}/>
                    <FormInput label="Email" id="email" onChange={onChange} name="email" value={loginData.email} errorMessage={parsedErrors?.email} />
                    <FormInput label="Password" id="password" type="password"  onChange={onChange} value={loginData.password} name="password"  errorMessage={parsedErrors?.password}/>
                    
                    <PrimaryButton onClick={onSubmit} isLoading={loginPending}>Login</PrimaryButton>
                </form>
                <div className="hero-card__section hero-card__section--border">
                    Don't have an account yet? <Link to={"/register"}>Register</Link> now to create custom who am I boards with your friends.
                </div>
            </div>
        </div>
    )
}

export default Login