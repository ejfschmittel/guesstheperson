import PEOPLE_TYPES from "../people.types"
import personReducer from "./person.reducer"

const initialState = {
    fetchPersonPending: false,
    fetchPersonError: null,
    fetchAllPeoplePending: false,
    fetchAllPeopleError: null,
    peopleByID: {},
    peopleList: []
}



const peopleReducer = (state = initialState, action) => {
    console.log(action)
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
            return {...state, fetchAllPeoplePending: true}
        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_SUCCESS:
            return {
                ...state, 
                fetchAllPeoplePending: false, 
                peopleByID: action.payload.reduce((res, next) => ({...res, [next.id]: next}) ,{}), 
                peopleList: action.payload.map(person => person.id)
            }
        case PEOPLE_TYPES.PEOPLE_FETCH_ALL_ERROR:
            return {...state, fetchAllPeoplePending: false, fetchAllPeopleError: action.payload}


        case PEOPLE_TYPES.PEOPLE_DELETE_SUCCESS:
            return {
                ...state, 
                peopleList: state.peopleList.filter(id => id !== action.payload.id),
                
            }

        case PEOPLE_TYPES.PEOPLE_DELETE_START:
            return {...state, peopleByID: {
                ...state.peopleByID,
                [action.payload.id]: personReducer(state.peopleByID[action.payload.id],action)
            }}
        default:
            return state
    }
}

export default peopleReducer