import React from 'react'
import {Link} from "react-router-dom"
import DefaultFullPageLayout from "../components/DefaultFullPageLayout.component"
import { useSelector } from 'react-redux';
import "../styles/pages/Homepage.styles.scss";


const HomePage = () => {

    const user = useSelector(store => store.user.user);

    return user ? (
        <DefaultFullPageLayout>
                <div className="wholescreen-flex">
                <div className="wholescreen-flex__container hero-card">
                    <h1 className="hero-card__title">Guess who?</h1>

                    <div className="hero-card__section">
                        {user.name} use your boards and people sections to create a custom board to play.
                    </div>

                    <div className="hero-card__section hero-card__section--border">
                        <Link to="/people"className="button button--center button--action">People</Link>
                    
                        <Link to="/boards" className="button button--center button--action">Boards</Link>
                    </div>
            
                </div>
            </div>
        </DefaultFullPageLayout>
        ):(
            <DefaultFullPageLayout>
                <div className="wholescreen-flex">
                    <div className="wholescreen-flex__container hero-card">
                        <h1 className="hero-card__title">Guess who?</h1>

                        <div className="hero-card__section">
                            Create custom game boards and use them to play with friends.
                        </div>

                        <div className="hero-card__section hero-card__section--border">
                            <Link to="/login"className="button button--center button--action">Login</Link>
                        
                            <Link to="/register" className="button button--center button--action">Register</Link>
                        </div>
                
                    </div>
                </div>
            </DefaultFullPageLayout>
        )
}

export default HomePage;