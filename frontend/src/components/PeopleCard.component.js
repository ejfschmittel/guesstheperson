import React, {useState} from 'react'

import "../styles/components/PeopleCard.scss"
import {FaCog, FaTrash, FaEdit} from "react-icons/fa"

const path = "http://localhost:8080/api/" 


const PeopleCard = ({person}) => {
    const [showSettings, setShowSettings] = useState(false)


    const toggleSettings = () => {
        console.log()
        setShowSettings(!showSettings)
    }

    return (
        <div className="people-card">
            <div className="people-card__options">
                <div className="people-card__options-btn" onClick={toggleSettings}>
                    <FaCog />
                </div>

                <div className={`people-card__option-items ${showSettings && 'people-card__option-items--show'}`}>
                    <button className="people-card__option-item">
                        <FaEdit />
                        Edit
                    </button>
                    <button className="people-card__option-item">
                        <FaTrash />Delete
                    </button>
                </div>
            </div>
            
            <div className="people-card__img-container">
                <img className="people-card__img" src={path + person.image_url} />
            </div>
            <div className="people-card__name">
                {person.name}
            </div>

         


        </div>
    )
}

export default PeopleCard
