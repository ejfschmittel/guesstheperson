import React from 'react'

import "../styles/components/LoadingIndicator.scss"

const LoadingIndicator = () =>  (
    <div className="loading-spinner">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
)
const LoadingOverlay = ({show}) => (
    <div className={`loading-incidator ${show && 'loading-incidator--show'}`}>
        <LoadingIndicator />
    </div>
)

export default LoadingOverlay 