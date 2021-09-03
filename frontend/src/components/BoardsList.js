import React from 'react'
import BoardPreview from './BoardPreview'
import "../styles/components/BoardsList.scss"

const BoardsList = ({boards}) => {
    return (
        <div className="boards-list">
            {boards && boards.map(board => (
                <BoardPreview id={board.id} board={board}/>
            ))}
        </div>
    )
}

export default BoardsList
