import React, {useState} from 'react'
import FlexOverlay from './FlexOverlay'
import FormInput from './FormInput.component'
import FormMessageDisplay from './FormMessageDisplay.component'
import PrimaryButton from './PrimaryButton'
import boardActions from '../redux/boards/boards.actions'
import { useSelector, useDispatch } from 'react-redux'
import {useParsedFieldErrors} from "../hooks/useParsedFieldError.hook"

const BoardCreateOverlay = ({showOverlay, setShowOverlay}) => {

    const dispatch = useDispatch()

    const isCreateBoardPending = useSelector(store => store.boards.create.createBoardPending)
    const createBoardError = useSelector(store => store.boards.create.createBoardError)
    const createdBoard = useSelector(store => store.boards.create.createdBoard )

    const parsedFieldErrors = useParsedFieldErrors(createBoardError)

    const [boardTitle, setBoardTitle] = useState("")
    const [statusMessage, setStatusMessage] = useState({
        message: "",
        type: "error"
    })



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