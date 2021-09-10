import React from 'react'
import {Link} from "react-router-dom"
import FormInput from '../components/FormInput.component'



const HomePage = () => {
    return (
        <div className="wholescreen-flex">
            
            <div className="wholescreen-flex__container">

                <FormInput label="search" />
                <Link to="/login"className="button button--center button--action">Login</Link>
                <Link to="/register" className="button button--center button--action">Register</Link>
            </div>

        </div>
    )
}

export default HomePage;