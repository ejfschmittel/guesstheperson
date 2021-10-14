import React from 'react'
import Header from "./Header.component"
import "../styles/components/DefaultFullPageLayout.styles.scss"

const DefaultFullPageLayout = ({children}) => (
    <div className="page-layout">
        <Header />

        <div className="page-layout__background">
            <div className="page-layout__left"></div>
            <div className="page-layout__right"></div>
        </div>
        
    </div>
)

export default DefaultFullPageLayout;