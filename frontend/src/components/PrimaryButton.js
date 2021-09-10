import React from 'react'


const PrimaryButton = ({children, className, isLoading, small, ...props}) => {
    return (
        <button className={`button button--action ${small ? 'button--small' : 'button--center'} ${className}`} disabled={isLoading} {...props}>
            {children}
        </button>
    )
}

export default PrimaryButton