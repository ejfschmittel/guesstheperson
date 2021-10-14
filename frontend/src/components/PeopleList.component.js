import React from 'react'
import PeopleCard from './PeopleCard.component'
import "../styles/components/PeopleList.scss"
import LoadingOverlay from './LoadingIndicator.component'
import {SortableContainer} from "react-sortable-hoc"

import FormMessageDisplay from "../components/FormMessageDisplay.component"

const PeopleList = (props) => {

    function shouldCancelStart(e) {
        // Cancel sorting if the event target is an `input`, `textarea`, `select` or `option`
        if (['input', 'textarea', 'select', 'option'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
            return true; // Return true to cancel sorting
        }
    }

    const getHelperDimensions = ({node}) =>({
        width: node.offsetWidth,
        height: node.offsetHeight,
    })


    return (
        <RawPeopleList {...props} distance={1}  shouldCancelStart={shouldCancelStart} getHelperDimensions={getHelperDimensions}/>
    )
}

export const RawPeopleList = SortableContainer(({items, sortable, hideOptions, selected, onClick, isLoading, emptyMessage}) => {
    return (
        <div className="people-list">
         
            <LoadingOverlay show={isLoading}/>

            {items.length === 0 && <FormMessageDisplay message={emptyMessage || "There are currently no people to display"} type="info" />}
           
           <div className="people-list__items">     
                {items.map((person, idx) => {
                    const isSelected = selected.filter(id => person.id === id).length === 1
                    return (
                        <PeopleCard 
                            person={person} 
                            key={person.id} 
                            index={idx} 
                            disabled={!sortable} 
                            selected={isSelected} 
                            hideOptions={hideOptions} 
                            onClick={onClick}
                            />
                    )
                })}
            </div>
        </div>
    )
})

PeopleList.defaultProps = {
    people: [],
    sortable: false,
    selected: [],
    hideOptions: true,
    onClick: () => {}
}

export default PeopleList