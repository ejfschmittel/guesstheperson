
import PEOPLE_TYPES from "../people.types"

const initialState = {
    createdPerson: null,
    createPersonError: null,
    createPersonPending: false,
}

const createReducer = (state = initialState, action) => {
    switch(action.type){
        case PEOPLE_TYPES.PEOPLE_CREATE_START:
            return { ...state, createPersonPending: true, createPersonError: null }
        case PEOPLE_TYPES.PEOPLE_CREATE_SUCCESS:
            return {...state, createPersonError: null, createdPerson: action.payload, createPersonPending: false}
        case PEOPLE_TYPES.PEOPLE_CREATE_ERROR:
            return {...state, createPersonError: action.payload, createdPerson: null, createPersonPending: false}
        default:
            return state
    }
}

export default createReducer
