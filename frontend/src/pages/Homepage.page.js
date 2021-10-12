import React from 'react'
import {Link} from "react-router-dom"
import FormInput from '../components/FormInput.component'
import DefaultFullPageLayout from "../components/DefaultFullPageLayout.component"
import "../styles/pages/Homepage.styles.scss";






const HomePage = () => {
    return (
        <DefaultFullPageLayout>
            <div className="home-page__container">
                    <h1 className="home-page__title">Guess who?</h1>   
            
                    <div className="home-page__links-container">
                    <Link to="/login"className="button button--center button--action">Login</Link>
                    <Link to="/register" className="button button--center button--action">Register</Link>
                    </div>
            </div>
        </DefaultFullPageLayout>
    )
}

export default HomePage;