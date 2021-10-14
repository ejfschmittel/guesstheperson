import React from 'react'
import { useSelector } from 'react-redux'
import "../styles/components/PageTitleSection.styles.scss"

const PageTitleSection = ({title, children}) => {

    const user = useSelector(store => store.user.user)

    return (
        <div className="page-section page-title-section">
            <h1 className="page-title-section__title">{user.name} | {title}</h1>
            <div className="page-title-section__body">
                {children}
            </div>
        </div>
    )
}

export default PageTitleSection