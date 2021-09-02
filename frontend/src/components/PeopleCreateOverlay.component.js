import React, {useState, useRef, useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import FormInput from "./FormInput.component"
import ImageSelector from './ImageSelector.component';
import "../styles/components/EditPersonOverlay.scss";
import {FaTimes} from "react-icons/fa"
import peopleActions from "../redux/people/people.actions"


const useCrop = (initialImage=null) => {
    const [img, setImg] = useState(initialImage)
    const [imgFile, setImgFile] = useState(null)
    const imgRef = useRef(null)



    const [crop, setCrop] = useState({
        unit: "%"
    });


    const cropImage = async () => {
        if( imgRef && crop.width && crop.height) {
          const croppedImage = await getCroppedImg(
            imgRef.current,
            crop,
            'newFile.jpeg'
          );
    
          console.log(imgFile)
          const previewUrl = window.URL.createObjectURL(croppedImage);
          setImg(previewUrl)
 
           const newImgFile = new File([croppedImage], imgFile.name)
           
           setImgFile(newImgFile)
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
              
              resolve(blob);
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


    return {crop,img,setImg, setCrop, onImageLoad, cropImage, imgFile,setImgFile}
}


const EditPersonOverlay = ({person, setShowOverlay, showOverlay}) => {
    const dispatch = useDispatch()
    const [editedPerson, setEditedPerson] = useState(person)
    const {crop, setCrop, onImageLoad, cropImage, img, setImg, setImgFile, imgFile} = useCrop()

   

    const onClickSaveClick = (e) => {
        // save or update 
        e.preventDefault()

        console.log(editedPerson)
        console.log(img)

        if(person.id){
            // update
         
        }else{
            // create
            const createPersonDto = {
                name: editedPerson.name,
                image: imgFile
            }
            console.log(createPersonDto)
            dispatch(peopleActions.createPerson(createPersonDto))
        }
    }

    const onChange = (e) => {
        setEditedPerson({
            ...editedPerson,
            [e.target.name]: e.target.value
        })
    }

    const onImageSelect = (e) => {
        console.log(e)
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImg(reader.result));
            console.log(e.target.files[0])
            setImgFile(e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onCropClick = (e) => {
        e.preventDefault();
        cropImage();
    }

    const closeOverlay = () => {
        setShowOverlay(false)
    }

    return (
        <div className={`overlay ${!showOverlay && 'overlay--hidden'}`} >
            <div className="overlay__container person-overlay">
                <div className="person-overlay__close" onClick={closeOverlay}>
                    <FaTimes />
                </div>
                <form>
                    <FormInput id="person-name" name="name" value={editedPerson?.name} onChange={onChange}/>
                    <ImageSelector 
                        src={img}
                        crop={crop}
                        setCrop={setCrop}
                        onImageLoad={onImageLoad}
                        crossorigin="anonymous"
                        onImageSelect={onImageSelect}
                    />
                    

                    <div className="person-overlay__buttons">
                        <button className="person-overlay__button" onClick={onClickSaveClick}>Save</button>
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