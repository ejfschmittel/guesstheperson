
import React, {useState, useEffect, useRef} from 'react'
import ReactCrop from 'react-image-crop';
import "../styles/components/ImageSelector.scss";
import 'react-image-crop/dist/ReactCrop.css';
/** <canvas className="image-selector__canvas"></canvas>
            <label className="image-selector__input-label">
                Select image
                <input  className="image-selector__input" type="file" onChange={onChange} />
            </label> */




const ImageSelector = ({src, crop, setCrop, onImageLoad, onImageSelect}) => {
    
  
 
    return (
        <div className="image-selector">
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
        </div>
    )
}

export default ImageSelector