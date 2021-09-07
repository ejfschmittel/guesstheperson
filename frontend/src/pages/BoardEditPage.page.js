import React, {useState, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import Header from '../components/Header.component'

import EditableTitle from '../components/EditableTitle'
import BoardEditAddPeopleOverlay from '../components/BoardEditAddPeopleOverlay'
import PeopleList from '../components/PeopleList.component'
import boardActions from "../redux/boards/boards.actions"


const BaordEditPage = () => {
    const {boardId} = useParams() 
    const dispatch = useDispatch()
    const [showOverlay, setShowOverlay] = useState(false)
    const board = useSelector(store => store.boards.boards.byId[boardId])

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
    }, [])

    const onAddPersonClick = () => {
        setShowOverlay(true)
    }

    
    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const addPeople = (people) => {
        let nextIndex = displayPeople.length;
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
                nextIndex++
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
            <BoardEditAddPeopleOverlay show={showOverlay} setShow={setShowOverlay} addPeople={addPeople}/>
            <EditableTitle value={title} onChange={onTitleChange}/>
            {/*<h1 className="page__title">{board ? board?.title : "Loading..."}</h1>*/}
            <button className="button button--action button--center" onClick={onAddPersonClick}>Add Person</button>
            <div className="message">
                Some message
            </div>
            <PeopleList items={displayPeople} axis="xy"  />
            <button className="button button--action button--center" onClick={onSave}>Save</button>
        </div>
    </div>
    )
}

export default BaordEditPage