import React, {useState} from 'react'
import FlexOverlay from './FlexOverlay'
import FormInput from './FormInput.component'
import FormMessageDisplay from './FormMessageDisplay.component'
import PrimaryButton from './PrimaryButton'

const BoardCreateOverlay = ({showOverlay, setShowOverlay}) => {

    const [boardTitle, setBoardTitle] = useState("")
    const [statusMessage, setStatusMessage] = useState({
        message: "",
        type: "error"
    })



    const onCreateClick = () => {
        
    }

    const onChange = (e) => {
        setBoardTitle(e.target.value)
    }

    return (
        <FlexOverlay setShow={setShowOverlay} show={showOverlay} title="Create New Board">
             <form>
                    <FormMessageDisplay message={statusMessage.message} type={statusMessage.type} />
                    <FormInput label="title" id="board-title" name="title" value={boardTitle} onChange={onChange} />      
                    <PrimaryButton onClick={onCreateClick} isLoading={false}>Create Board</PrimaryButton>
                </form>

        </FlexOverlay>
    )
}

export default BoardCreateOverlay