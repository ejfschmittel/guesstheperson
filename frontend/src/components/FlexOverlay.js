import React from 'react'
import {FaTimes} from "react-icons/fa"
import "../styles/components/FlexOverlay.scss"

const FlexOverlay = ({show, setShow, className, children, title}) => (
    <div className={`overlay ${!show && 'overlay--hidden'}`} >
            <div className={`overlay__container ${className ? className : ''}`}>

                <div className="overlay__title">
                    {title}

                    <div className="overlay__close" onClick={() => setShow(false)}>
                        <FaTimes />
                    </div>
                </div>
               

                <div className="overlay__content">
                    {children}  
                </div>
               
            </div>
    </div>
)


export default FlexOverlay