import React from 'react'
import LoadingIndicator from './LoadingIndicator'
import "../styles/components/LoadingOverlay.styles.scss"

const LoadingOverlay = ({isLoading}) => {
    return (
        <div className={`loading-overlay ${isLoading ? 'loading-overlay--show' : ''}`}>
            <LoadingIndicator />
        </div>
    )
}

export default LoadingOverlay;