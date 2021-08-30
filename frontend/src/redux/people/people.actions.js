import PEOPLE_TYPES from "./people.types";
import peopleService from "./people.service"

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

export default {
    fetchAllPeople
}