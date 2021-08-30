import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import Header from "../components/Header.component"
import PeopleList from '../components/PeopleList.component'
import peopleActions from "../redux/people/people.actions"

/*

    CreatePersonOverlay
*/

const PeopleOverview = () => {
    const dispatch = useDispatch()
    const peopleList = useSelector(store => store.people.peopleList)
    const peopleByID= useSelector(store =>store.people.peopleByID)
    const isLoadingPeople = useSelector(store => store.people.fetchAllPeoplPending)
    

    console.log(isLoadingPeople)
    console.log(peopleByID)
    console.log(peopleList)

    const people = peopleList.map(id => peopleByID[id])

    useEffect(() => {
        // load people list
        dispatch(peopleActions.fetchAllPeople())
    }, [])

    return (

        <div className="page page--fullscreen page--flex" >
            <Header />
        
            <div className="page__content page__content--container">
                <button>Create new Person</button>
                <PeopleList people={people}/>
            </div>
        </div>
       
    )
}

export default PeopleOverview