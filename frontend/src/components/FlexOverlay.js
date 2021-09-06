import React from 'react'
import {FaTimes} from "react-icons/fa"
import "../styles/components/FlexOverlay.scss"

const FlexOverlay = ({show, setShow, className, children}) => (
    <div className={`overlay ${!show && 'overlay--hidden'}`} >
            <div className={`overlay__container ${className ? className : ''}`}>
            <div className="overlay__close" onClick={() => setShow(false)}>
                <FaTimes />
            </div>
            {children}
            </div>
    </div>
)


export default FlexOverlay