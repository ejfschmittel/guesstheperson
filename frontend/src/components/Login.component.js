import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput.component'
import {useDispatch, useSelector} from "react-redux"
import userActions from "../redux/user/user.actions"
import PrimaryButton from './PrimaryButton'
import PrimaryFormErrorField from './PrimaryFormErrorField'


const Login = () => {
    const dispatch = useDispatch()
    const loginPending = useSelector(store => store.user.userLoginPending)
    const loginError = useSelector(store => store.user.userLoginError)
    console.log("login error!!!!")
    console.log(loginError)

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

                <form>
                    <PrimaryFormErrorField errorMessage={loginError?.primaryMessage}/>
                    <FormInput label="Email" id="email" onChange={onChange} name="email" value={loginData.email} />
                    <FormInput label="Password" id="password" type="password"  onChange={onChange} value={loginData.password} name="password"/>
                    
                    <PrimaryButton onClick={onSubmit} isLoading={loginPending} >Login</PrimaryButton>
                </form>
                <div className="hero-card__section">
                    <Link to={"/register"} className="button button--center button--action">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login