import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {FaPlus} from "react-icons/fa"

import peopleActions from "../redux/people/people.actions"

import CreatePersonOverlay from '../components/CreatePersonOverlay.component'
import FormInput from '../components/FormInput.component'
import Header from "../components/Header.component"
import PageTitleSection from "../components/PageTitleSection.component"
import PeopleList from '../components/PeopleList.component'
import PeopleOverviewCard from '../components/PeopleOverviewCard.component'

import "../styles/pages/PeopleOverviewpage.styles.scss"

/*

    CreatePersonOverlay
*/

const PeopleOverview = () => {
    const dispatch = useDispatch()
    const peopleList = useSelector(store => store.people.people.peopleList)
    const peopleByID= useSelector(store =>store.people.people.peopleByID)
    const isLoadingPeople = useSelector(store => store.people.people.fetchAllPeoplePending)

    const [searchTerm, setSearchTerm] = useState("")
    const [displayedPeople, setDisplayedPeople] = useState([])

    const [showOverlay, setShowOverlay] = useState(false)


    // load user people on load
    useEffect(() => {
        dispatch(peopleActions.fetchAllPeople())
    }, [dispatch])


    // react to people update & convert to display ready array
    useEffect(() => {
        if(peopleByID){
            const people = peopleList.map(id => peopleByID[id])
            setDisplayedPeople(people)
        }
        setShowOverlay(false)
    }, [peopleByID, peopleList])

    const onCreateClick = () => {
        setShowOverlay(true)
    }

    const onSearch = (e) => {
        setSearchTerm(e.target.value)
        filterDisplayedPeopleBySearch(e.target.value)
    }

    const filterDisplayedPeopleBySearch = (searchTerm) => {
        const people = peopleList.map(id => {
            const person = peopleByID[id]
            return person.name.toLowerCase().includes(searchTerm.toLowerCase()) ? person : null; 
        }).filter(person => person !== null)
  
        setDisplayedPeople(people)
    }


    return (

        <div className="page page--fullscreen page--flex" >
            <Header />
        
            <div className="page__content page__content--container">
        
                <PageTitleSection title="People Overview">
                    <div className="people-overview-header__controlls">
                        <div className="people-overview-header__input"><FormInput label="search" value={searchTerm} onChange={onSearch}/></div>
                        <div className="people-overview-header__button"> <button className="button button--action" onClick={onCreateClick}><FaPlus />New Person</button></div>
                    </div>
                </PageTitleSection>
              
               
                <div className="page-section">
                    <PeopleList 
                        items={displayedPeople}  
                        hideOptions={false} 
                        isLoading={isLoadingPeople} 
                        emptyMessage={searchTerm ? `There are no people with the name '${searchTerm}'` : null}
                        card={PeopleOverviewCard}
                        />
                </div>
                
                <CreatePersonOverlay setShowOverlay={setShowOverlay} showOverlay={showOverlay}/>
            </div>
        </div>
    )
}

export default PeopleOverview