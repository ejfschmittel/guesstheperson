import React, {useMemo, useEffect} from 'react'
import PeopleCard from './PeopleCard.component'
import "../styles/components/PeopleList.scss"
import LoadingOverlay from './LoadingIndicator.component'
import {SortableContainer} from "react-sortable-hoc"

import FormMessageDisplay from "../components/FormMessageDisplay.component"


export const DISPLAY_TYPES = {
    STANDARD: "standard",
    AUTO_FIT: "auto_fit"
}

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

export const RawPeopleList = SortableContainer(({id, card: Card, items, sortable, hideOptions, selected, onClick, isLoading, emptyMessage, displayType}) => {

    const classes = useMemo(() => {
        switch(displayType){
            case DISPLAY_TYPES.AUTO_FIT:
                return "people-list people-list--auto-fit"
            default:
                return "people-list"
        }
    }, [displayType])



    return (
        <div className={classes}>
         
            <LoadingOverlay show={isLoading}/>

            {items.length === 0 && <FormMessageDisplay message={emptyMessage || "There are currently no people to display"} type="info" />}
           
           <div className="people-list__items">     
                {items.map((person, idx) => {
                 
                    const isSelected = selected.filter(id => person.id === id).length === 1
                    return (
                        <Card 
                            person={person} 
                            key={id + person.id} 
                            index={idx} 
                            disabled={!sortable} 
                            selected={isSelected} 
                            hideOptions={hideOptions} 
                            onClick={onClick}
                            selectable={!!selected}
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
    onClick: () => {},
    card: PeopleCard,
    displayType: DISPLAY_TYPES.STANDARD
}

export default PeopleList