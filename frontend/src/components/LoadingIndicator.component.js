import React from 'react'

import "../styles/components/LoadingIndicator.scss"

const LoadingIndicator = () =>  (
    <div class="loading-spinner">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
)
const LoadingOverlay = ({show}) => (
    <div className={`loading-indicator ${show && 'loading-indicator--show'}`}>
        <LoadingIndicator />
    </div>
)

export default LoadingOverlay 