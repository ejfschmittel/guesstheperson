import React from 'react'
import {FaCheck, FaTimes} from "react-icons/fa"
import "../styles/components/ToggleCheckbox.styles.scss"

const ToggleCheckbox = React.memo(({onChange, value}) => (
    <label className={`checkbox ${value ? 'checkbox--checked' : ''}`}>
        <input className="checkbox__input" type="checkbox" onChange={onChange} checked={value}/>
        <div className="checkbox__inner">
            <FaCheck className="checkbox__check"/>
            <FaTimes className="checkbox__times"/>
            <div className="checkbox__circle"></div>
        </div>
    </label>
))


export default ToggleCheckbox;