import PEOPLE_TYPES from "../people.types"

const initialState = {
    id: null,
    name: null,
    image_url: null,
    owner: null,
    deletePending: false,
    deleteError: null,
    updateError: null,
    updatePending: false,
}



const personReducer = (state = initialState, action) => {
    switch(action.type){
        case PEOPLE_TYPES.PEOPLE_DELETE_START:
            return {...state, deletePending: true}
        case PEOPLE_TYPES.PEOPLE_DELETE_ERROR:
            return {...state, deletePending: false, deleteError: action.payload.error}
        case PEOPLE_TYPES.PEOPLE_UPDATE_START:
            return {...state, updatePending: true}
        case PEOPLE_TYPES.PEOPLE_UPDATE_SUCCESS:
            return {...state, ...action.payload, updatePending: false}
        case PEOPLE_TYPES.PEOPLE_UPDATE_ERROR:
            return {...state, updatePending: false, updateError: action.payload.error}
      
        default:
            return state
    }
}

export default personReducer