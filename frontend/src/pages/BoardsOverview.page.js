import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {FaPlus} from "react-icons/fa"

import boardsActions from "../redux/boards/boards.actions"

import BoardCreateOverlay from '../components/BoardCreateOverlay.component';
import BoardsList from '../components/BoardsList'
import Header from '../components/Header.component'
import FormInput from '../components/FormInput.component';
import PageTitleSection from "../components/PageTitleSection.component"


const BoardsOverviewPage = () => {
    const dispatch = useDispatch()

    // selectors
    const boardsByID = useSelector(store => store.boards.boards.byId)
    const boardsList = useSelector(store => store.boards.boards.list)
    const fetchBoardsPending = useSelector(store => store.boards.boards.fetchAllPending)
    const fetchBoardsError = useSelector(store => store.boards.boards.fetchAllError)

    // state variables
    const [searchTerm, setSearchTerm] = useState("")
    const [showBoardCreate, setShowBoardCreate] = useState(false)
    const [boards,setBoards] = useState([])


    // fetch user's boards on load
    useEffect(() =>{
        dispatch(boardsActions.fetchAllBoards())
    },[dispatch])

    // read boards after they have loaded / updated
    useEffect(() => {
        setBoards(boardsList.map(boardId => boardsByID[boardId]))
    }, [boardsByID, boardsList])

    // update search state & update displayed boards based on search term
    const onSearch = (e) => {
        setSearchTerm(e.target.value)

        const searchedBoards = boardsList.map(boardId => {
            const board = boardsByID[boardId]
            return board.title.toLowerCase().includes(e.target.value) ? board : null;
        }).filter((board) => board !== null)
        setBoards(searchedBoards)
    }

    const onCreateClick = () => {
        setShowBoardCreate(true)
    }

    return (
        <div className="page page--fullscreen page--flex" >
        <Header />
    
        <div className="page__content page__content--container">

            <PageTitleSection title="Boards">
                <div className="people-overview-header__controlls">
                    <div className="people-overview-header__input"><FormInput label="search" value={searchTerm} onChange={onSearch}/></div>
                    <div className="people-overview-header__button"> <button className="button button--action" onClick={onCreateClick}><FaPlus />New Board</button></div>
                </div>
            </PageTitleSection>
  
            <div className="page-section">
                <BoardsList boards={boards} isLoading={fetchBoardsPending} error={fetchBoardsError} />
            </div>
   
        </div>
        <BoardCreateOverlay showOverlay={showBoardCreate} setShowOverlay={setShowBoardCreate}/>
    </div>
    )
}

export default BoardsOverviewPage