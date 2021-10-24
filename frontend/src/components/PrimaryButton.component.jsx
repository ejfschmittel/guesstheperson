import React from 'react'

import LoadingIndicator from './LoadingIndicator'

const PrimaryButton = ({children, className, isLoading, small, ...props}) => {
    return (
        <button className={`button button--action ${small ? 'button--small' : 'button--center'} ${className}`} disabled={isLoading} {...props}>
            {isLoading && <LoadingIndicator  className="button__loading"/>}
           
            {children}
        </button>
    )
}

export default PrimaryButton