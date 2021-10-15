import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput.component'
import {useDispatch, useSelector} from "react-redux"
import userActions from "../redux/user/user.actions"
import PrimaryButton from "./PrimaryButton"
import { useParsedFieldErrors } from '../hooks/useParsedFieldError.hook'
import FormMessageDisplay from "./FormMessageDisplay.component"



const Register = () => {
    const dispatch = useDispatch()
    const userRegisterPending = useSelector(store => store.user.registerUserPending)
    const userRegisterError = useSelector(store => store.user.registerUserError)
    const parsedFieldErrors = useParsedFieldErrors(userRegisterError)

    const [formMessage, setFormMessage] = useState({
        message: null,
        type: "error",
    })

    useEffect(() => {
        if(userRegisterError && userRegisterError.primaryMessage){
            setFormMessage({
                message: userRegisterError.primaryMessage,
                type: "error"
            })
        }
    }, [userRegisterError])



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
        setFormMessage({message: null, type: "error"})
        dispatch(userActions.register(registerData))
    }

    
    return (

        <div className="wholescreen-flex">
            <div className="wholescreen-flex__container hero-card">
                <h1 className="hero-card__title">Register</h1>

                <form className="hero-card__section">
              
                    <FormMessageDisplay message={formMessage.message} type={formMessage.type} />
                    <FormInput label="Email" id="email" name="email" value={registerData.email} onChange={onChange} errorMessage={parsedFieldErrors?.email}/>
                    <FormInput label="Username" id="name" name="name"  value={registerData.name} onChange={onChange}  errorMessage={parsedFieldErrors?.name}/>
                    <FormInput label="Password" id="password" name="password" type="password" value={registerData.password} onChange={onChange} errorMessage={parsedFieldErrors?.password}/>
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