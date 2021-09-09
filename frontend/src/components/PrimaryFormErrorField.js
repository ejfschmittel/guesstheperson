import React from 'react'
import "../styles/components/PrimaryFormErrorField.scss"

const PrimaryFormErrorField = ({errorMessage}) => (
    <div className={`primary-error-field ${errorMessage && "primary-error-field--active"}`}>
        {errorMessage}
    </div>
)

export default PrimaryFormErrorField