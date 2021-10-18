import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import BoardDisplay from '../components/BoardDisplay'
import Header from '../components/Header.component'
import boardsActions from '../redux/boards/boards.actions'
import LoadingOverlay from "../components/LoadingOverlay.component"
import NotFoundNotice from "../components/NotFoundNotice.component"

const PlayBoard = () => {
    const { boardId } = useParams()
    const dispatch = useDispatch()
    const board = useSelector(store => store.boards.boards.byId[boardId])
    const fetchBoardPending = useSelector(store => store.boards.boards.fetchOnePending)
    
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

                {!fetchBoardPending && !board ? 
                <NotFoundNotice title="Board Not Found" message={`No board with id '${boardId} found.'`}/>
                :
                <React.Fragment>
                    <LoadingOverlay isLoading={fetchBoardPending} />
                    <BoardDisplay people={people}/> 
                </React.Fragment>
                }
            </div>
        </div>
    )
}

export default PlayBoard