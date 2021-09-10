import React, {useState} from 'react'
import FormInput from './FormInput.component'
import {useDispatch} from "react-redux"
import boardActions from "../redux/boards/boards.actions"

const CreateBoardForm = () => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState("")

    const onCreateClick = (e) => {
        e.preventDefault();
        dispatch(boardActions.createBoard({title}))
    }


    const onTitleChange = (e) => {
        setTitle(e.target.value)

     
    }

    return (
        <form className="create-board-form">
            <FormInput label="Board title" value={title} onChange={onTitleChange} name="board-title" id="board-title-input"/>
            <button className="edit-person-btn" onClick={onCreateClick}>Create new Board</button>
        </form>
    )
}

export default CreateBoardForm