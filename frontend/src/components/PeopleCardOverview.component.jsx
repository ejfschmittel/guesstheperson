import React from 'react'
import {FaTrash} from "react-icons/fa"
import peopleActions from "../redux/people/people.actions"
import { useDispatch } from 'react-redux'
import PeopleCard from './PeopleCard.component'

const PeopleCardOverview = ({person, ...props}) => {
    const dispatch = useDispatch()

    const onDeleteClick = (e) => {
        dispatch(peopleActions.deletePerson(person.id))
    }

    return (
        <PeopleCard {...props} person={person}>
            <div className="people-card__overlay" onClick={onDeleteClick}>
                <div><FaTrash /> Delete</div>
            </div>
        </PeopleCard>
    )
}

export default PeopleCardOverview