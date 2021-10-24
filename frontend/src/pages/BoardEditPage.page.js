import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import {FaPlus, FaTrash, FaArrowLeft} from "react-icons/fa"

import boardActions from "../redux/boards/boards.actions"

import Header from '../components/Header.component'
import BoardEditAddPeopleOverlay from '../components/BoardEditAddPeopleOverlay'
import BoardEditShare from '../components/BoardEditShare.component'
import FormInput from '../components/FormInput.component'
import FormMessageDisplay from '../components/FormMessageDisplay.component'
import LoadingOverlay from '../components/LoadingOverlay.component'
import NotFoundNotice from '../components/NotFoundNotice.component'
import PeopleList from '../components/PeopleList.component'
import PageTitleSection from '../components/PageTitleSection.component'
import PrimaryButton from "../components/PrimaryButton"
import PeopleEditCard from '../components/PeopleEditCard.component'

import "../styles/pages/BoardEditPage.styles.scss"

const BaordEditPage = () => {
    const {boardId} = useParams() 
    const dispatch = useDispatch()
  
    // selectors
    const boards = useSelector(store => store.boards.boards.byId)
    const isEditPending = useSelector(store => store.boards.edit.editBoardPending)
    const fetchOnePending = useSelector(store => store.boards.boards.fetchOnePending)

    // state vars
    const [showOverlay, setShowOverlay] = useState(false)
    const [title, setTitle] = useState("Loading...")
    const [displayPeople, setDisplayPeople] = useState([])
    const board = boards[boardId]

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
            console.log(boardPeople)
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

    const reorderArray = (array, fromIndex, toIndex) => {
        array = [...array];
        const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

        if (startIndex >= 0 && startIndex < array.length) {
            const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

            const [item] = array.splice(fromIndex, 1);
            array.splice(endIndex, 0, item);
        }
        return array;
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
        dispatch(boardActions.deleteBaord(boardId))
    }

    // removes card from board (local only until save)
    const onRemoveCard = (removePerson) => {
        const newDisplayPeople = displayPeople.filter(person => person.id !== removePerson.id)
        setDisplayPeople(newDisplayPeople)
    }


    const onSortEnd = ({oldIndex, newIndex}) => {
        const newOrderedArray = reorderArray(displayPeople, oldIndex, newIndex)
        setDisplayPeople(newOrderedArray)
        
    }


    console.log("display people")
    console.log(displayPeople)
    return (
        <div className="page page--fullscreen page--flex" >
            <Header />
        

            {!fetchOnePending && !board ? 
                <div className="page__content page__content--container">
                        <NotFoundNotice title="No Board Found" message={`can't find board with id '${boardId}'`}/>
                </div>
            :
            (          
                <React.Fragment>
                    <div className="page__content page__content--container">
                        <LoadingOverlay isLoading={fetchOnePending} />

                        <PageTitleSection title={"Edit 'Placeholder'"}>

                            <div className="board-edit-controlls">
                                <BoardEditShare className="share-board-icon" board={board}/>
                                <Link className="back-to-boards-overview-link" to="/boards" title="Back To Boards Overview"><FaArrowLeft /></Link>
                            </div>
                            
                       
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
                                id="board-edit-people"
                                items={displayPeople} 
                                sortable={true}
                                onSortEnd={onSortEnd}
                                axis="xy" 
                                card={({person, ...props}) => 
                                    <PeopleEditCard person={person} {...props} onRemoveClick={() => onRemoveCard(person)}/>
                                }
                                />
                        </div>
                        
                    </div>
                    
                    <BoardEditAddPeopleOverlay title="Edit board" show={showOverlay} setShow={setShowOverlay} addPeople={addPeople}/>
                </React.Fragment>
            )}
        </div>
    )
}

export default BaordEditPage