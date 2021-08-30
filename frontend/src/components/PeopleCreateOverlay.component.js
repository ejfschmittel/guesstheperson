import React, {useState, useRef, useEffect, useCallback} from 'react'

import FormInput from "./FormInput.component"
import ImageSelector from './ImageSelector.component';
import "../styles/components/EditPersonOverlay.scss";



const useCrop = (initialImage=null) => {
    const [img, setImg] = useState(initialImage)
    const imgRef = useRef(null)



    const [crop, setCrop] = useState({
        unit: "%"
    });


    const cropImage = async () => {
        if( imgRef && crop.width && crop.height) {
          const croppedImageUrl = await getCroppedImg(
            imgRef.current,
            crop,
            'newFile.jpeg'
          );
          console.log(croppedImageUrl)
          setImg(croppedImageUrl)
        }
    }

    const getCroppedImg = (image, crop, fileName) => {

        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
    
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
    
 
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
    

    
        return new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                //reject(new Error('Canvas is empty'));
                console.error('Canvas is empty');
                return;
              }
              const previewUrl = window.URL.createObjectURL(blob);
              resolve(previewUrl);
            },
            'image/jpeg',
            1
          );
        });
      }

    const onImageLoad = useCallback((img) => {
        imgRef.current = img;
        imgRef.current.crossOrigin = "anonymous"
    }, []);


    return {crop,img,setImg, setCrop, onImageLoad, cropImage}
}


const EditPersonOverlay = ({person, setShowOverlay}) => {

    const {crop, setCrop, onImageLoad, cropImage, img, setImg} = useCrop()

    const onClickSaveClick = () => {
        // save or update 
    }

    const onImageSelect = (e) => {
        console.log(e)
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onCropClick = (e) => {
        e.preventDefault();
        cropImage();
    }


    return (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
            <div className="overlay__container person-overlay">
                <form>
                    <FormInput />
                    <ImageSelector 
                        src={img}
                        crop={crop}
                        setCrop={setCrop}
                        onImageLoad={onImageLoad}
                        crossorigin="anonymous"
                        onImageSelect={onImageSelect}
                    />
                    

                    <div className="person-overlay__buttons">
                        <button className="person-overlay__button">Save</button>
                        <button className="person-overlay__button" onClick={onCropClick}>Crop</button>
                        <label className="person-overlay__button" onClick={onImageSelect}>
                            ChangeImage
                            <input type="file" style={{display: "none"}} onChange={onImageSelect}/>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPersonOverlay;