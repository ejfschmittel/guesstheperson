import React from 'react'
import {FaQuestionCircle} from "react-icons/fa"
import "../styles/components/NotFoundNotice.styles.scss"

const NotFoundNotice = ({title, message}) => {
    return (
        <div className="not-found">
            <div className="not-found__container">

                <FaQuestionCircle />
                <h1 className="not-found__title">{title}</h1>
                <p  className="not-found__message">{message}</p>
            </div>
        </div>
    )
}

NotFoundNotice.defaultProps = {
    title: "Not Found",
    message: ""
}

export default NotFoundNotice;