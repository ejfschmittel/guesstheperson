import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import Header from '../components/Header.component'

import {FaPlus, FaTrash} from "react-icons/fa"
import EditableTitle from '../components/EditableTitle'
import BoardEditAddPeopleOverlay from '../components/BoardEditAddPeopleOverlay'
import PeopleList from '../components/PeopleList.component'
import boardActions from "../redux/boards/boards.actions"
import FormInput from '../components/FormInput.component'
import PrimaryButton from '../components/PrimaryButton'
import PageTitleSection from '../components/PageTitleSection.component'

import "../styles/pages/BoardEditPage.styles.scss"

const BaordEditPage = () => {
    const {boardId} = useParams() 
    const dispatch = useDispatch()
    const [showOverlay, setShowOverlay] = useState(false)
    const board = useSelector(store => store.boards.boards.byId[boardId])
    const user = useSelector(store => store.user.user)

    const [title, setTitle] = useState("Loading...")


    const [displayPeople, setDisplayPeople] = useState([])

    useEffect(() => {
        if(board){
            setTitle(board.title)
            const boardPeople = board.people.reduce((arr, boardPerson) => {
                if(boardPerson.person) return [...arr, boardPerson.person]
                return arr
            },[])
            setDisplayPeople(boardPeople)
        }
    },[board])


    console.log("DISPLAY PEOPLE")
    console.log(displayPeople)
    useEffect(() => {
        // fetch board
        dispatch(boardActions.fetchOneBoard(boardId))
    }, [dispatch, boardId])

    const onAddPersonClick = () => {
        setShowOverlay(true)
    }

    
    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const addPeople = (people) => {
        let peopleToAdd = []

        
        for(let i = 0; i < people.length; i++){
            // prevent duplicate addition of people
            let exists = false;
            displayPeople.forEach(displayPerson => {
                if(displayPerson.id === people[i].id){
                    exists = true;
                }
            })

            // add people
            if(!exists){
                peopleToAdd.push(people[i])
            }else{
                console.log(people[i].id + " already exists")
            }
        }

        setDisplayPeople([...displayPeople, ...peopleToAdd])
    }

    const onSave = (e) => {
        e.preventDefault();
        // combine titlte and personlist to transfer object 
        if(board){
            const updateBoardDto = {
                title: title,
                people: displayPeople.map(displayPerson => displayPerson.id)
            }
            dispatch(boardActions.updateBoard(board.id, updateBoardDto))
        }
    }

    return (
    <div className="page page--fullscreen page--flex" >
        <Header />
    
        <div className="page__content page__content--container">


            <PageTitleSection title={"Edit 'Placeholder'"}>
                <div className="edit-board-title-container">
                    <div className="people-overview-header__input"><FormInput label="title"/></div>
                    <div className="people-overview-header__button"> <button className="button button--mid button--action"  onClick={onAddPersonClick}><FaPlus />Add People</button></div>
                    <div className="people-overview-header__button"> <button className="button button--mid button--danger"><FaTrash />Delete Board</button></div>
                </div>
            </PageTitleSection>
  
      
            <div className="page-section edit-board-body">
                <div className="edit-board-body__save">
                <button className="button button--action button--center" onClick={onSave}>Save</button>
                </div>
                <PeopleList items={displayPeople} axis="xy"  />
            </div>
            
           


        </div>

        <BoardEditAddPeopleOverlay title="Edit board" show={showOverlay} setShow={setShowOverlay} addPeople={addPeople}/>
    </div>
    )
}

export default BaordEditPage