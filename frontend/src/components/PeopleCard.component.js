import React, {useState, useRef, useEffect} from 'react'
import { SortableElement} from "react-sortable-hoc"

import {API_BASE_URL} from "../utils/urls.utils"

import "../styles/components/PeopleCard.scss"


const PeopleCard = SortableElement(({children, person, selected, selectable, onClick}) => {
    const cardRef = useRef()
    const [image, setImage] = useState(null)


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

    useEffect(() => {
        loadImage();
    }, [person])


    const onPersonClick = (e) => {
        onClick(person)
    }


    return (
        <div className={`people-card ${selected ? 'people-card--selected' : ''} ${selectable ? 'people-card--selectable' : ''}`} ref={cardRef} onClick={onPersonClick}>
               
            <div className="people-card__flex-container">
                <div className="people-card__img-container" >
                  <img src={image ? image.src : null} alt={`card: ${person.name}`}/>
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
