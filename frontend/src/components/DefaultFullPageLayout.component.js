import React from 'react'
import Header from "./Header.component"
import "../styles/components/DefaultFullPageLayout.styles.scss"

const DefaultFullPageLayout = ({children}) => (
    <div className="full-page-layout">
        <Header />
        <div className="full-page-layout__left">
        {children}
        </div>
        <div className="full-page-layout__right">
           
        </div>
    </div>
)

export default DefaultFullPageLayout;