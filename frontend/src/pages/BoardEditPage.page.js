import React, {useState, useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import Header from '../components/Header.component'


import BoardEditAddPeopleOverlay from '../components/BoardEditAddPeopleOverlay'
import PeopleList from '../components/PeopleList.component'
import boardActions from "../redux/boards/boards.actions"

const BaordEditPage = () => {
    const {boardId} = useParams() 
    const dispatch = useDispatch()
    const [showOverlay, setShowOverlay] = useState(false)
    const board = useSelector(store => store.boards.boards.byId[boardId])


    const people = useMemo(() => { 
        return board ? board.people.map(boardPerson => boardPerson.person) : []
    },[board])

    console.log("people asdfadfadf")
    console.log(people)

    useEffect(() => {
        // fetch board
        dispatch(boardActions.fetchOneBoard(boardId))
    }, [])

    const onAddPersonClick = () => {
        setShowOverlay(true)
    }

    


    return (
    <div className="page page--fullscreen page--flex" >
        <Header />
    
        <div className="page__content page__content--container">
            <BoardEditAddPeopleOverlay show={showOverlay} setShow={setShowOverlay}/>
            <h1 className="page__title">{board ? board?.title : "Loading..."}</h1>
            <button className="button button--action button--center" onClick={onAddPersonClick}>Add Person</button>
            <div className="message">
                Some message
            </div>
            <PeopleList items={people} axis="xy"  />
            <button className="button button--action button--center">Save</button>
        </div>
    </div>
    )
}

export default BaordEditPage