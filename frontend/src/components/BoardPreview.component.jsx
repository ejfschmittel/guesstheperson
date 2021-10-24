import React from 'react'
import {Link} from "react-router-dom"
import {FaEdit, } from "react-icons/fa"
import "../styles/components/BoardPreview.scss"

const BoardPreview = ({board}) => {
    return (
        <div className="board-preview" >

            <div className="board-preview__feature-img" style={{backgroundImage: `url('/board.png')` }}></div>

            <div className="board-preview__title">
                {board.title}
            </div>

            <div className="board-preview__buttons">
                <Link to={`/boards/${board.id}/edit`} className="board-preview__btn board-preview__edit-btn"><FaEdit /> Edit</Link>
                <Link to={`/boards/${board.id}`} className="board-preview__btn board-preview__play-btn"><FaEdit /> Play</Link>
            </div>
        </div>
    )
}

export default BoardPreview
