import React from 'react'
import {FaTrash} from "react-icons/fa"
import PeopleCard from './PeopleCard.component'

const PeopleOverviewCard = ({person, onRemoveClick, ...props}) => {
    const onDeleteClick = (e) => {
        onRemoveClick(person)
    }

    return (
        <PeopleCard {...props} person={person}>
            <div className="people-card__overlay-edit">
       

                <div className="expanding-btn" title="remove" onClick={onDeleteClick}>
                    <div className="expanding-btn__text">
                        Remove
                    </div>
                    <div className="expanding-btn__icon">
                        <FaTrash />  
                    </div>
                </div>

                
                <div className="people-card__edit-drag">Drag to order</div>
            </div>
        </PeopleCard>
    )
}

export default PeopleOverviewCard