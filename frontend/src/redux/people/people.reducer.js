
import PEOPLE_TYPES from "./people.types"

const initialState = {
    createdPerson: null,
    createPersonError: null,
    createPeoplePending: false,


    fetchAllPeoplPending: false,
    fetchAllPeopleError: null,
    peopleByID: {},
    peopleList: []
}

const peopleReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_START:
            return {...state, fetchAllPeoplPending: true}
        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_SUCCESS:
            console.log("FETCH PEOPEL SUCCESS")
            return {
                ...state, 
                fetchAllPeoplPending: false, 
                peopleByID: action.payload.reduce((res, next) => ({...res, [next.id]: next}) ,{}), 
                peopleList: action.payload.map(person => person.id)
            }
        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_ERROR:
            return {...state, fetchAllPeoplPending: false, fetchAllPeopleError: action.payload}
        default:
            return state;
    }
}

export default peopleReducer