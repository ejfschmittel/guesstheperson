import React, {useState, useRef, useEffect} from 'react'
import {useDispatch} from "react-redux"

import "../styles/components/PeopleCard.scss"
import {FaCog, FaTrash, FaEdit} from "react-icons/fa"
import peopleActions from "../redux/people/people.actions"
import { SortableElement} from "react-sortable-hoc"

import {API_BASE_URL} from "../utils/urls.utils"



const PeopleCard = SortableElement(({children, person, selected, selectable, hideOptions, onClick}) => {
    const dispatch = useDispatch()
    const cardRef = useRef()
    const [showSettings, setShowSettings] = useState(false)


    const [image, setImage] = useState(null)


    useEffect(() => {
        loadImage();
    }, [person])

    const loadImage = async () => {
        if(person){
            const url = API_BASE_URL + person.image_url;
            const image = new Image();
            image.onload = () => {
                setImage(image)
            }
            image.src = url
        }
    }


    const onPersonClick = (e) => {
        onClick(person)
    }


    return (
        <div className={`people-card ${selected ? 'people-card--selected' : ''} ${selectable ? 'people-card--selectable' : ''}`} ref={cardRef} onClick={onPersonClick}>
               
            <div className="people-card__flex-container">
                {/*<div className="people-card__img-container" style={{backgroundImage: `url('${API_BASE_URL + person.image_url}')`}}>
                   
                </div>*/}
                <div className="people-card__img-container" >
                  <img src={image ? image.src : null} />
                </div>
            </div>
            
       
            <div className="people-card__name" title={person.name}>
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
