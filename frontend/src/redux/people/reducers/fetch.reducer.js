import PEOPLE_TYPES from "../people.types"
import personReducer from "./person.reducer"

const initialState = {
    fetchPersonPending: false,
    fetchPersonError: null,
    fetchAllPeoplPending: false,
    fetchAllPeopleError: null,
    peopleByID: {},
    peopleList: []
}



const peopleReducer = (state = initialState, action) => {
    switch(action.type){

        case PEOPLE_TYPES.PEOPLE_CREATE_SUCCESS:
            return {
                ...state, 
                peopleList: [...state.peopleList, action.payload.id],
                peopleByID: {
                    ...state.peopleByID,
                    [action.payload.id]: action.payload
                }
            }

        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_START:
            return {...state, fetchAllPeoplPending: true}
        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_SUCCESS:
            return {
                ...state, 
                fetchAllPeoplPending: false, 
                peopleByID: action.payload.reduce((res, next) => ({...res, [next.id]: next}) ,{}), 
                peopleList: action.payload.map(person => person.id)
            }
        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_ERROR:
            return {...state, fetchAllPeoplPending: false, fetchAllPeopleError: action.payload}


        case PEOPLE_TYPES.PEOPLE_DELETE_START:
            return {...state, peopleByID: {
                ...state.peopleByID,
                [action.payload.id]: peopleReducer(state.peopleByID[action.payload.id],action)
            }}
        default:
            return state
    }
}

export default peopleReducer