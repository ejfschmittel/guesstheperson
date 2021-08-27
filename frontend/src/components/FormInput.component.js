import React from 'react'
import "../styles/components/FormInput.scss"

const FormInput = ({id, label, errorMessage, ...props}) => {
    return (
        <div className="form-input">
            <input className="form-input__input" id={id} {...props} placeholder=""/>
            <label className="form-input__label" for={id}>{label}</label>
            <div className="form-input__error">{errorMessage}</div>
        </div>
    )
}

export default FormInput;