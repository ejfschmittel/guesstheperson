import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import peopleActions from "../redux/people/people.actions"
import { useParsedFieldErrors } from '../hooks/useParsedFieldError.hook';
import useCrop from "../hooks/useCrop.hook"

import FlexOverlay from "./FlexOverlay.component"
import FormMessageDisplay from './FormMessageDisplay.component';
import FormInput from "./FormInput.component"
import ImageSelector from './ImageSelector.component';
import PrimaryButton from "./PrimaryButton.component"

import "../styles/components/EditPersonOverlay.scss";

const CreatePersonOverlay = ({setShowOverlay, showOverlay}) => {
    const dispatch = useDispatch()

    const [personName, setPersonName] = useState("")
    const {crop, setCrop, onImageLoad, cropImage, img, setImg, setImgFile, imgFile} = useCrop()

    const [statusMessage, setStatusMessage] = useState({
        message: "",
        type: "error"
    })
    const createPersonError = useSelector(store => store.people.create.createPersonError)

    const [prevPending, setPrevPending] = useState(false)
    const createPersonErrorPending = useSelector(store => store.people.create.createPersonPending)
    const parsedFieldErrors = useParsedFieldErrors(createPersonError)


    useEffect(() => {
        if(createPersonErrorPending){
            setPrevPending(true)
        }else if(!createPersonErrorPending && prevPending){
            setPrevPending(false)
            setPersonName("")
            setImg(null)
            setImgFile(null)
        }
    }, [createPersonErrorPending])




    const onSaveClick = (e) => {
        // save or update 
        e.preventDefault()

        // create
        const createPersonDto = {
            name: personName,
            image: imgFile
        }
  
        dispatch(peopleActions.createPerson(createPersonDto))
    
    }



    const onChange = (e) => {
        setPersonName(e.target.value)
    }

    const onImageSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImg(reader.result));
            setImgFile(e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onCropClick = (e) => {
        e.preventDefault();
        cropImage();
    }

    const onOverlayClose = () => {
        setImgFile(null)
        setImg(null)
        setPersonName("")
    }


    return (
        <FlexOverlay setShow={setShowOverlay} show={showOverlay} className="person-overlay" title="Create New Person" onClose={onOverlayClose}>
       
                <form>
                    <FormMessageDisplay message={statusMessage.message} type={statusMessage.type} />
                    <FormInput label="name" id="person-name" name="name" value={personName} onChange={onChange} errorMessage={parsedFieldErrors.name}/>
                    <ImageSelector 
                        src={img}
                        crop={crop}
                        setCrop={setCrop}
                        onImageLoad={onImageLoad}
                        crossorigin="anonymous"
                        onImageSelect={onImageSelect}
                        errorMessage={parsedFieldErrors.image}
                    />
                    

                    <div className="person-overlay__buttons">
                        <PrimaryButton onClick={onSaveClick} isLoading={false} small>Save</PrimaryButton>
                        <PrimaryButton onClick={onCropClick} isLoading={false} small>Crop</PrimaryButton>
                        <label className="button button--action button--small" onClick={onImageSelect}>
                            ChangeImage
                            <input type="file" style={{display: "none"}} onChange={onImageSelect}/>
                        </label>
                    </div>
                </form>

        </FlexOverlay>
    )
}

export default CreatePersonOverlay;