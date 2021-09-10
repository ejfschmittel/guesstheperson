import PEOPLE_TYPES from "./people.types";
import peopleService from "./people.service"



const deletePerson = (personId) => dispatch => {
    const deletePersonStart = () => ({
        type: PEOPLE_TYPES.PEOPLE_DELETE_START,
        payload: {id: personId}
    })

    const deletePersonSuccess = (personId) => ({
        type: PEOPLE_TYPES.PEOPLE_DELETE_SUCCESS,
        payload: {id: personId}
    })

    const deletePersonError = (id, error) => ({
        type: PEOPLE_TYPES.PEOPLE_DELETE_ERROR,
        payload: {id, error}
    })  

    dispatch(deletePersonStart())

    peopleService.deletePerson(personId)
    .then(json => {
        console.log(json)
        dispatch(deletePersonSuccess(json.id))
    })
    .catch(error => {
        console.log(error)
        dispatch(deletePersonError(personId, error))
    })
}

const createPerson = (createPersonDto) => (dispatch) => {
    const createPersonStart = () => ({
        type: PEOPLE_TYPES.PEOPLE_CREATE_START
    })

    const createPersonSuccess = (person) => ({
        type: PEOPLE_TYPES.PEOPLE_CREATE_SUCCESS,
        payload: person
    })

    const createPersonError = (error) => ({
        type: PEOPLE_TYPES.PEOPLE_CREATE_ERROR,
        payload: error
    })  

    dispatch(createPersonStart())

    peopleService.createPerson(createPersonDto)
    .then(json => {
        console.log(json)
        dispatch(createPersonSuccess(json))
    })
    .catch(error => {
        console.log(error)
        dispatch(createPersonError(error))
    })

}

const fetchAllPeople = () => (dispatch) => {
    const fetchAllPeopleStart = () => ({
        type: PEOPLE_TYPES.PEOPLE_FETCH_ALL_START
    })

    const fetchAllPeopleSuccess = (people) => ({
        type: PEOPLE_TYPES.PEOPLE_FETCH_ALL_SUCCESS,
        payload: people
    })

    const fetchAllPeopleError = (error) => ({
        type: PEOPLE_TYPES.PEOPLE_FETCH_ALL_ERROR,
        payload: error
    })


    dispatch(fetchAllPeopleStart())

    peopleService.fetchAllPeople()
        .then(json => {
            console.log(json)
            dispatch(fetchAllPeopleSuccess(json))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchAllPeopleError(error))
        })
}


const peopleActions = {
    fetchAllPeople,
    createPerson,
    deletePerson
}

export default peopleActions
   