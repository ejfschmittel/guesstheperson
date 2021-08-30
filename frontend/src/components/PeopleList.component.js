import React from 'react'
import PeopleCard from './PeopleCard.component'
import "../styles/components/PeopleList.scss"

const PeopleList = ({people}) => {
    return (
        <div className="people-list">
            {people.map((person) => (
                <PeopleCard person={person} id={person.id}/>
            ))}
        </div>
    )
}

export default PeopleList