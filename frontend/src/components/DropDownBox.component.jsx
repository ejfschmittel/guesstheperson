import React, {useState} from 'react'
import {FaChevronDown, FaChevronUp} from "react-icons/fa"
import "../styles/components/DropDownContainer.styles.scss"

const DropDownContainer = ({children}) => {

    const [expanded, setExpanded] = useState(false)


    const toggleExpanded = () => setExpanded(!expanded)

    return (
        <div className={`drop-down ${expanded ? 'drop-down--expanded' : ''}`}>
            <div className="drop-down__header" onClick={toggleExpanded}>
                {expanded ? <FaChevronUp /> :  <FaChevronDown />}
            </div>
            <div className="drop-down__body">
                {children}
            </div>
        </div>
    )
}

export default DropDownContainer;