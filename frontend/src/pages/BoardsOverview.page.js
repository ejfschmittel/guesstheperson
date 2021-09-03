import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import Header from '../components/Header.component'
import CreateBoardForm from '../components/CreateBoardForm'
import BoardsList from '../components/BoardsList'
import boardsActions from "../redux/boards/boards.actions"

const BoardsOverviewPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    const boardsByID = useSelector(store => store.boards.boards.byId)
    const boardsList = useSelector(store => store.boards.boards.list)
    const boards = boardsList.map(boardId => boardsByID[boardId])

    console.log(boardsList)
    console.log(boardsByID)

    useEffect(() =>{
        dispatch(boardsActions.fetchAllBoards())
    },[])


    return (
        <div className="page page--fullscreen page--flex" >
        <Header />
    
        <div className="page__content page__content--container">
            <h1 className="page__title">{user.name}'s Boards Selection</h1>
            <CreateBoardForm />
            <BoardsList boards={boards}/>
        </div>
    </div>
    )
}

export default BoardsOverviewPage