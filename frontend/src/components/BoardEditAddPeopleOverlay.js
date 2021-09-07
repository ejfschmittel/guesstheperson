import React, {useEffect, useState, useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FlexOverlay from './FlexOverlay'
import PeopleList from "./PeopleList.component"
import FormInput from "./FormInput.component"
import peopleActions from "../redux/people/people.actions"

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
        const selectedPeopleArray = selectedPeople.map(peopleId => {
            return peopleById[peopleId]
        })
       
        addPeople(selectedPeopleArray)

        // remove selected people
        setSelectedPeople([])
        // set search = ""
        setSerachTerm("")
        setPeopleDisplayList(allPeople)
        // close window
        setShow(false)
    }

    const onSearch = (e) => {
        setSerachTerm(e.target.value)
        const searchTerm = e.target.value;
        console.log("all people")
        console.log(allPeople)

        const searchResults = allPeople.filter(person => {
            return person.name.includes(searchTerm)
        })
        setPeopleDisplayList(searchResults)
    }

    

    return (
        <FlexOverlay setShow={setShow} show={show} >
            <h3>Add new Peopel to your board</h3>
            <p>You have currently selected {selectedPeople.length} People</p>
  
            <FormInput label="Search" id="search-person" value={searchTerm} onChange={onSearch}/>
            <PeopleList items={peopleDisplayList} sortable={false} onClick={onPersonClick} selected={selectedPeople}/>
            <button className="button button--action button--center" onClick={onAddPeopleClick}>Add People</button>
        </FlexOverlay>
    )
}

export default BoardEditAddPeopleOverlay