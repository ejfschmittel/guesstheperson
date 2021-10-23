import React, {useState} from 'react'
import {FaShareAlt, FaCheck, FaTimes} from "react-icons/fa"
import {useDispatch} from "react-redux"
import boardActions from "../redux/boards/boards.actions"
import FlexOverlay from './FlexOverlay'
import ToggleCheckbox from "./ToggleCheckbox.component"
import FormMessageDisplay from './FormMessageDisplay.component'
import "../styles/components/BoardEditShare.styles.scss"
/*
    - slider
    - loading 
    - copy link area

    onChange => update sharing option


*/

const BoardEditShare = ({className, board}) => {
    const dispatch = useDispatch()

    const [showShareBoard, setShowShareBoard] = useState(false)

    const toggleShowBoard = () => setShowShareBoard(!showShareBoard)


    const [share, setShare] =  useState(board ? board.sharing_enabled : false)
    const [message, setMessage] = useState("")


    const link = board ? `${window.location.hostname}/boards/${board.id}` : ''
    

    const copyLinkToClipBoard = () => {
        navigator.clipboard.writeText(link).then(function() {
            setMessage('Copying to clipboard was successful!')
            hideMessage()
        }, function(err) {
            setMessage('Could not copy text: ');
            hideMessage()
        });
    }

    const hideMessage = () => {
        setTimeout(() => {
            setMessage('')
        }, 2000)
    }

 
    const onShareChange = (e) => {
        setShare(e.target.checked)

      
        if(board){
            const updateBoardDto = {
                title: board.title,
                people: board.people.map(person => person.person.id),
                sharing_enabled: e.target.checked
            }

            // call action
            console.log(updateBoardDto)
            dispatch(boardActions.updateBoard(board.id, updateBoardDto))
        }
        
    }

    return (
        <div className={`board-share ${showShareBoard ? 'board-share--show' : ''}`}>
            <div className={className} onClick={toggleShowBoard}>
                <FaShareAlt />
            </div>
            <FlexOverlay setShow={setShowShareBoard} title="Share Board" show={showShareBoard} >
                <div className="board-share__container">
                    
                   

                    <div className="board-share__public-container">
                        <ToggleCheckbox onChange={onShareChange} value={share}/>
                        <label>Share Board public</label>
                    </div>
               
                  
                    <div className="board-share__input-container">
                        <input className="board-share__input" type="text" value={link} name="share-link" readOnly={true}/>
                        <button  className="board-share__copy-btn" onClick={copyLinkToClipBoard}>Copy Link</button>
                    </div>
                    <FormMessageDisplay message={message} type="info" />
                </div>
            </FlexOverlay>
        </div>
    )
}

export default BoardEditShare