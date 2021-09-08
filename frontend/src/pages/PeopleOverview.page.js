import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import Header from "../components/Header.component"
import PeopleList from '../components/PeopleList.component'
import peopleActions from "../redux/people/people.actions"
import EditPersonOverlay from '../components/PeopleCreateOverlay.component'
/*

    CreatePersonOverlay
*/

const PeopleOverview = () => {
    const dispatch = useDispatch()
    const peopleList = useSelector(store => store.people.people.peopleList)
    const peopleByID= useSelector(store =>store.people.people.peopleByID)
    const isLoadingPeople = useSelector(store => store.people.people.fetchAllPeoplePending)
    const user = useSelector(store => store.user.user)
    const people = peopleList.map(id => peopleByID[id])

    const [overlayPerson, setOverlayPerson] = useState({
        name: "test",
        image_url: "",
    })
    const [showOverlay, setShowOverlay] = useState(false)

    useEffect(() => {
        // load people list
        dispatch(peopleActions.fetchAllPeople())
    }, [])

    const onCreateClick = () => {
        setShowOverlay(true)
    }



    return (

        <div className="page page--fullscreen page--flex" >
            <Header />
        
            <div className="page__content page__content--container">
                <h1 className="page__title">{user.name}'s People Selection</h1>
                <button className="edit-person-btn" onClick={onCreateClick}>Create new Person</button>
                <PeopleList items={people}  hideOptions={false}/>
                <EditPersonOverlay person={overlayPerson} setShowOverlay={setShowOverlay} showOverlay={showOverlay}/>
            </div>
        </div>
       
    )
}

export default PeopleOverview