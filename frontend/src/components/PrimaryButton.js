import React from 'react'


const PrimaryButton = ({children, className, isLoading, ...props}) => {
    return (
        <button className={`button button--action button--center test ${className}`} disabled={isLoading} {...props}>
            {children}
        </button>
    )
}

export default PrimaryButton