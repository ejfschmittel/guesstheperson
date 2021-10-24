import React, {useEffect, useState, useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import peopleActions from "../redux/people/people.actions"

import FlexOverlay from './FlexOverlay'
import FormInput from "./FormInput.component"
import PeopleList, {DISPLAY_TYPES} from "./PeopleList.component"
import PrimaryButton from "./PrimaryButton"

import "../styles/components/BoardEditAddPeopleOverlay.styles.scss"

const BoardEditAddPeopleOverlay = ({setShow, show, addPeople}) => {
    const dispatch = useDispatch()
    const [searchTerm, setSerachTerm] = useState("")
    const [peopleDisplayList, setPeopleDisplayList] = useState([])
    const [selectedPeople, setSelectedPeople] = useState([])

    const peopleById = useSelector(store => store.people.people.peopleByID)
    const peopleList = useSelector(store => store.people.people.peopleList)

    const allPeople = useMemo(() => {
            return peopleList.map(personId => peopleById[personId]);
        },
        [peopleList, peopleById],
    )


    // fetch users people on load
    useEffect(() => {
        dispatch(peopleActions.fetchAllPeople())
    },[dispatch])

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
        const selectedPeopleArray = selectedPeople.map(peopleId => {
            return peopleById[peopleId]
        })
       
        addPeople(selectedPeopleArray)

        // remove selected people
        setSelectedPeople([])
        setSerachTerm("")
        setPeopleDisplayList(allPeople)
        setShow(false)
    }

    const onSearch = (e) => {
        setSerachTerm(e.target.value)
        const searchTerm = e.target.value;

        const searchResults = allPeople.filter(person => {
            return person.name.includes(searchTerm)
        })
        setPeopleDisplayList(searchResults)
    }
    

    return (
        <FlexOverlay setShow={setShow} show={show} title="Add People">
            <h3 className="board-add-people__subtitle">Add new Peopel to your board</h3>
            <p className="board-add-people__count-info"> You have currently selected {selectedPeople.length} People</p>
  
            <FormInput label="Search" id="search-person" value={searchTerm} onChange={onSearch}/>
            <PeopleList items={peopleDisplayList} sortable={false} onClick={onPersonClick} selected={selectedPeople} displayType={DISPLAY_TYPES.AUTO_FIT}/>
            <PrimaryButton onClick={onAddPeopleClick}>Add People</PrimaryButton>
        </FlexOverlay>
    )
}

export default BoardEditAddPeopleOverlay