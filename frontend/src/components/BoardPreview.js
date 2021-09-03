import React from 'react'
import {Link} from "react-router-dom"

import "../styles/components/BoardPreview.scss"

const BoardPreview = ({board}) => {
    return (
        <Link className="board-preview" to={`/boards/${board.id}`}>
            <div>
                <img />
            </div>
            <div>
                {board.title}
            </div>
        </Link>
    )
}

export default BoardPreview
