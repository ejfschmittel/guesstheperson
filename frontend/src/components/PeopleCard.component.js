import React from 'react'

import "../styles/components/PeopleCard.scss"


const path = "http://localhost:8080/api/" 


const PeopleCard = ({person}) => {

    return (
        <div className="people-card">
            <div className="people-card__img-container">
                <img className="people-card__img" src={path + person.image_url} />
            </div>
            <div className="people-card__name">
                {person.name}
            </div>
            <button className="people-card__edit-btn">Edit</button>
            <button className="people-card__delete-btn">Delete</button>
        </div>
    )
}

export default PeopleCard
