import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import boardActions from '../redux/boards/boards.actions'
import {useParsedFieldErrors} from "../hooks/useParsedFieldError.hook"

import FlexOverlay from './FlexOverlay'
import FormInput from './FormInput.component'
import FormMessageDisplay from './FormMessageDisplay.component'
import PrimaryButton from './PrimaryButton'


const BoardCreateOverlay = ({showOverlay, setShowOverlay}) => {
    const dispatch = useDispatch()

    const isCreateBoardPending = useSelector(store => store.boards.create.createBoardPending)
    const createBoardError = useSelector(store => store.boards.create.createBoardError)
    const parsedFieldErrors = useParsedFieldErrors(createBoardError)

    const [boardTitle, setBoardTitle] = useState("")
    const [statusMessage, setStatusMessage] = useState({
        message: "",
        type: "error"
    })


    // create board
    const onCreateClick = (e) => {
        e.preventDefault();
        const createBoardDto = {
            title: boardTitle
        }
        dispatch(boardActions.createBoard(createBoardDto))
    }

    const onChange = (e) => {
        setBoardTitle(e.target.value)
    }

    return (
        <FlexOverlay setShow={setShowOverlay} show={showOverlay} title="Create New Board">
            <form>
                <FormMessageDisplay message={statusMessage.message} type={statusMessage.type} />
                <FormInput label="title" id="board-title" name="title" value={boardTitle} onChange={onChange} errorMessage={parsedFieldErrors.title}/>      
                <PrimaryButton onClick={onCreateClick} isLoading={isCreateBoardPending}>Create Board</PrimaryButton>
            </form>
        </FlexOverlay>
    )
}

export default BoardCreateOverlay