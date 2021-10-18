import React from 'react'
import "../styles/components/LoadingIndicator.styles.scss"

const LoadingIndicator = ({className}) => {
    return (
        <div className={`spinner ${className}`}>
            <div className="spinner__rect spinner__rect--1"></div>
            <div className="spinner__rect spinner__rect--2"></div>
            <div className="spinner__rect spinner__rect--3"></div>
            <div className="spinner__rect spinner__rect--4"></div>
            <div className="spinner__rect spinner__rect--5"></div>
        </div>
    )
}

export default LoadingIndicator