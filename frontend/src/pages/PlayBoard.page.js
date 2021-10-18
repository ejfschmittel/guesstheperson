import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import BoardDisplay from '../components/BoardDisplay'
import Header from '../components/Header.component'
import boardsActions from '../redux/boards/boards.actions'

const PlayBoard = () => {
    const { boardId } = useParams()
    const dispatch = useDispatch()
    const board = useSelector(store => store.boards.boards.byId[boardId])
    
    const [people, setPeople] = useState([])


    useEffect(() => {
        let people = [];
        if(board){
            people = board.people.map(boardPerson => boardPerson.person)     
        }
        setPeople(people)
    },[board])
    
    useEffect(() => {
        // fetch board
        dispatch(boardsActions.fetchOneBoard(boardId))
    }, [dispatch, boardId])


    return (
        <div className="page page--fullscreen page--flex" >
            <Header />
        
            <div className="page__content page__content--container">
                <BoardDisplay people={people}/>

               
            </div>
        </div>
    )
}

export default PlayBoard