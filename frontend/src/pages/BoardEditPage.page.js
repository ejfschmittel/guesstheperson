import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams, useLocation} from "react-router-dom"
import Header from '../components/Header.component'

import {FaPlus, FaTrash} from "react-icons/fa"
import BoardEditAddPeopleOverlay from '../components/BoardEditAddPeopleOverlay'
import PeopleList from '../components/PeopleList.component'
import boardActions from "../redux/boards/boards.actions"
import FormInput from '../components/FormInput.component'
import PageTitleSection from '../components/PageTitleSection.component'
import PrimaryButton from "../components/PrimaryButton"
import FormMessageDisplay from '../components/FormMessageDisplay.component'
import PeopleEditCard from '../components/PeopleEditCard.component'
import "../styles/pages/BoardEditPage.styles.scss"

const BaordEditPage = () => {
    const {boardId} = useParams() 
    const dispatch = useDispatch()
  
    // selectors
    const board = useSelector(store => store.boards.boards.byId[boardId])
    const isEditPending = useSelector(store => store.boards.edit.editBoardPending)
    const user = useSelector(store => store.user.user)

    // state vars
    const [showOverlay, setShowOverlay] = useState(false)
    const [title, setTitle] = useState("Loading...")
    const [displayPeople, setDisplayPeople] = useState([])

    // fetch board on load
    useEffect(() => {
        dispatch(boardActions.fetchOneBoard(boardId))
    }, [dispatch, boardId])

    // fill in data after board has loaded
    useEffect(() => {
        if(board){
            setTitle(board.title)
            const boardPeople = board.people ? board.people.reduce((arr, boardPerson) => {
                if(boardPerson.person) return [...arr, boardPerson.person]
                return arr
            },[]) : [];
            setDisplayPeople(boardPeople)
        }
    },[board])



    // open add people overlay on button click
    const onAddPersonClick = () => {
        setShowOverlay(true)
    }

    // onChange handler for title
    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    // add people to board (local only)
    const addPeople = (people) => {
        let peopleToAdd = []

        
        for(let i = 0; i < people.length; i++){
            // prevent duplicate addition of people
            let exists = false;
            displayPeople.forEach(displayPerson => {
                if(displayPerson.id === people[i].id){
                    exists = true;
                }
            })

            // add people
            if(!exists){
                peopleToAdd.push(people[i])
            }else{
                console.log(people[i].id + " already exists")
            }
        }

        setDisplayPeople([...displayPeople, ...peopleToAdd])
    }

    // save all changes
    const onSave = (e) => {
        e.preventDefault();
        // combine titlte and personlist to transfer object 
        if(board){
            const updateBoardDto = {
                title: title,
                people: displayPeople.map(displayPerson => displayPerson.id)
            }
            dispatch(boardActions.updateBoard(board.id, updateBoardDto))
        }
    }

    // deletes board
    const onDeleteBoardClick = () => {

    }

    const onRemoveCard = (removePerson) => {
        const newDisplayPeople = displayPeople.filter(person => person.id !== removePerson.id)
        setDisplayPeople(newDisplayPeople)
    }

    return (
        <div className="page page--fullscreen page--flex" >
            <Header />
        
            <div className="page__content page__content--container">


                <PageTitleSection title={"Edit 'Placeholder'"}>
                    <div className="edit-board-title-container">
                        <div className="people-overview-header__input">
                            <FormInput 
                                label="title"
                                value={title}
                                onChange={onTitleChange}
                                />
                        </div>
                        <div className="people-overview-header__button"> <button className="button button--mid button--action"  onClick={onAddPersonClick}><FaPlus />Add People</button></div>
                        <div className="people-overview-header__button"> <button className="button button--mid button--danger" onClick={onDeleteBoardClick}><FaTrash />Delete Board</button></div>
                    </div>
                </PageTitleSection>
    
        
                <div className="page-section edit-board-body">
                    <div className="edit-board-body__save">
                        
                        <PrimaryButton onClick={onSave} isLoading={isEditPending}>Save</PrimaryButton>
                        <FormMessageDisplay message="" type="error"/>
                    </div>
                    <PeopleList 
                        items={displayPeople} 
                        axis="xy" 
                        card={({person, ...props}) => 
                            <PeopleEditCard person={person} {...props} onRemoveClick={() => onRemoveCard(person)}/>
                        }
                        />
                </div>

            </div>
            
            <BoardEditAddPeopleOverlay title="Edit board" show={showOverlay} setShow={setShowOverlay} addPeople={addPeople}/>
        </div>
    )
}

export default BaordEditPage