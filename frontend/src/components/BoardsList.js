import React from 'react'
import BoardPreview from './BoardPreview'
import FormMessageDisplay from './FormMessageDisplay.component'
import "../styles/components/BoardsList.scss"



const BoardsList = ({boards, emptyMessage}) => {
    return (
        <div className="boards-list">

            <div className="boards-list__items">
                {boards && boards.map(board => (
                    <BoardPreview id={board.id} board={board} key={board.id}/>
                ))}
            </div>
            

            {boards.length == 0 && <FormMessageDisplay message={emptyMessage} type="info"/>}
        </div>
    )
}

BoardsList.defaultProps = {
    emptyMessage: "There aren't currently any boards. Create One.",
    boards: [],
}

export default BoardsList
