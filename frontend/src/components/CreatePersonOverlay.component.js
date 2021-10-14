import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import FormInput from "./FormInput.component"
import ImageSelector from './ImageSelector.component';
import "../styles/components/EditPersonOverlay.scss";
import peopleActions from "../redux/people/people.actions"
import FlexOverlay from "./FlexOverlay"
import useCrop from "../hooks/useCrop.hook"
import PrimaryFormErrorField from "./PrimaryFormErrorField"
import PrimaryButton from "./PrimaryButton"

const CreatePersonOverlay = ({person, setShowOverlay, showOverlay}) => {
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



    return (
        <FlexOverlay setShow={setShowOverlay} show={showOverlay} className="person-overlay" title="Create New Person">
       
                <form>
                    <FormInput label="name" id="person-name" name="name" value={editedPerson?.name} onChange={onChange}/>
                    <ImageSelector 
                        src={img}
                        crop={crop}
                        setCrop={setCrop}
                        onImageLoad={onImageLoad}
                        crossorigin="anonymous"
                        onImageSelect={onImageSelect}
                    />
                    

                    <div className="person-overlay__buttons">
                        <PrimaryButton onClick={onClickSaveClick} isLoading={false} small>Save</PrimaryButton>
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