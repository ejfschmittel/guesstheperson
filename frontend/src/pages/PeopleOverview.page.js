import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import Header from "../components/Header.component"
import PeopleList from '../components/PeopleList.component'
import peopleActions from "../redux/people/people.actions"
import CreatePersonOverlay from '../components/CreatePersonOverlay.component'

import FormInput from '../components/FormInput.component'
import "../styles/pages/PeopleOverviewpage.styles.scss"
import {FaPlus} from "react-icons/fa"
import PeopleOverviewCard from '../components/PeopleOverviewCard.component'
import PageTitleSection from "../components/PageTitleSection.component"
/*

    CreatePersonOverlay
*/

const PeopleOverview = () => {
    const dispatch = useDispatch()
    const peopleList = useSelector(store => store.people.people.peopleList)
    const peopleByID= useSelector(store =>store.people.people.peopleByID)
    const isLoadingPeople = useSelector(store => store.people.people.fetchAllPeoplePending)
    const user = useSelector(store => store.user.user)

    const [searchTerm, setSearchTerm] = useState("")
    const [displayedPeople, setDisplayedPeople] = useState([])

    const [showOverlay, setShowOverlay] = useState(false)



    useEffect(() => {
        // load people list
        dispatch(peopleActions.fetchAllPeople())
    }, [dispatch])


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
        filterPeople(e.target.value)
    }


    const filterPeople = (searchTerm) => {
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