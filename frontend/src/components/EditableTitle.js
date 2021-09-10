import React from 'react'


const EditableTitle = ({value, onChange}) => {
    return (
        <div className="editable-title" >
            <input className="editable-title__input" value={value} onChange={onChange}  />  
        </div>
    )
}

export default EditableTitle