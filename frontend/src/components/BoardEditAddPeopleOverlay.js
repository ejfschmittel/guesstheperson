import React, {useEffect, useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FlexOverlay from './FlexOverlay'
import PeopleList from "./PeopleList.component"
import FormInput from "./FormInput.component"
import peopleActions from "../redux/people/people.actions"

const BoardEditAddPeopleOverlay = ({setShow, show, board}) => {
    const dispatch = useDispatch()

    const [peopleDisplayList, setPeopleDisplayList] = useState([])
    const [selectedPeople, setSelectedPeople] = useState([])

    const peopleById = useSelector(store => store.people.people.peopleByID)
    const peopleList = useSelector(store => store.people.people.peopleList)
    console.log(peopleList)
    console.log(peopleById)

    const allPeople = useCallback(() => {
            return peopleList.map(personId => peopleById[personId]);
        },
        [peopleList, peopleById],
    )



    useEffect(() => {
        dispatch(peopleActions.fetchAllPeople())
    },[])

    useEffect(() => {
     
        setPeopleDisplayList(allPeople)
    },[allPeople])


    const onPersonClick = (person) => {


        const newSelectedPeople = selectedPeople.includes(person.id) ?
            selectedPeople.filter(id => id !== person.id) :
            [...selectedPeople, person.id]

        setSelectedPeople(newSelectedPeople)
    }

    const onAddPeopleClick = () => {
        // update board with people
    }

    return (
        <FlexOverlay setShow={setShow} show={show} >
            <h3>Add new Peopel to your board</h3>
            <p>You have currently selected {selectedPeople.length} People</p>
  
            <FormInput label="Search" id="search-person"/>
            <PeopleList items={peopleDisplayList} sortable={false} onClick={onPersonClick} selected={selectedPeople}/>
            <button className="button button--action button--center" onClick={onAddPeopleClick}>Add People</button>
        </FlexOverlay>
    )
}

export default BoardEditAddPeopleOverlay