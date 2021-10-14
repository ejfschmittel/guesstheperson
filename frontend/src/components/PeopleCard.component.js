import React, {useState, useRef} from 'react'
import {useDispatch} from "react-redux"

import "../styles/components/PeopleCard.scss"
import {FaCog, FaTrash, FaEdit} from "react-icons/fa"
import peopleActions from "../redux/people/people.actions"
import { SortableElement} from "react-sortable-hoc"

import {API_BASE_URL} from "../utils/urls.utils"



const PeopleCard = SortableElement(({children, person, selected, hideOptions, onClick}) => {
    const dispatch = useDispatch()
    const cardRef = useRef()
    const [showSettings, setShowSettings] = useState(false)



    const onPersonClick = (e) => {
        onClick(person)
    }

    const toggleSettings = (e) => {
        e.preventDefault()
        
        console.log()
        setShowSettings(!showSettings)
    }

    return (
        <div className={`people-card ${selected ? 'people-card--selected' : ''}`} ref={cardRef} onClick={onPersonClick}>
               
            <div className="people-card__flex-container">
                <div className="people-card__img-container" style={{backgroundImage: `url('${API_BASE_URL + person.image_url}')`}}>
                   
                </div>
            </div>
            
       
            <div className="people-card__name">
                {person.name}
            </div>

            {children}

        </div>
    )
})


PeopleCard.defaultProps = {
    person: null,
    selected: false,
    hideOptions: false,
    onClick: () => {}
}

export default PeopleCard
