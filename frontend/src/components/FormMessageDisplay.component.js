import React, {useMemo} from 'react'
import "../styles/components/FormMessageDisplay.styles.scss";

const MESSAGE_TYPES = {
    ERROR: "error",
    WARNING: "warning",
    SUCCESS: "success",
    INFO: "info"
}


const FormMessageDisplay = (props) => {

    const {message, type} = props;

    const messageClass = useMemo(() => {
        switch(type){
            case MESSAGE_TYPES.WARNING:
                return "form-message-display__warning";
            case MESSAGE_TYPES.SUCCESS:
                return "form-message-display__success";
            case MESSAGE_TYPES.INFO:
                return "form-message-display__info";
            default:
                return "form-message-display__error"
        }
    }, [type])

  

    return (
        <div className={`form-message-display ${messageClass} ${!message && 'form-message-display__hidden'}`}>
            {message}
        </div>
    )
}

export default FormMessageDisplay;