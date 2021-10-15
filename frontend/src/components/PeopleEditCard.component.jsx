import React from 'react'
import {FaTrash} from "react-icons/fa"
import PeopleCard from './PeopleCard.component'

const PeopleOverviewCard = ({person, onRemoveClick, ...props}) => {
    const onDeleteClick = (e) => {
        onRemoveClick(person)
    }

    return (
        <PeopleCard {...props} person={person}>
            <div className="people-card__overlay" onClick={onDeleteClick}>
                <div><FaTrash /> Remove</div>
            </div>
        </PeopleCard>
    )
}

export default PeopleOverviewCard