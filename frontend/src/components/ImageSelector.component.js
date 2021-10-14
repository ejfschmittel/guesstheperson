
import React from 'react'
import ReactCrop from 'react-image-crop';
import "../styles/components/ImageSelector.scss";
import 'react-image-crop/dist/ReactCrop.css';



const ImageSelector = ({src, crop, setCrop, onImageLoad, onImageSelect, errorMessage}) => {
    return (
        <div className={`image-selector ${errorMessage && 'image-selector--error'}`}>
           {src ? <ReactCrop 
            src={src} 
            crop={crop} 
            onChange={newCrop => setCrop(newCrop)} 
            onImageLoaded={onImageLoad}
            />
        :
            <label className="image-selector__input-label">
                Select Image
                <input className="image-selector__input" type="file" onChange={onImageSelect}/>
            </label>
        }
        <div className="form-input__error">{errorMessage}</div>
        </div>
    )
}

export default ImageSelector