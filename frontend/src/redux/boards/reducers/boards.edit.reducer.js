import BOARDS_TYPES from "../boards.types"



const initialState = {
    updateBoardPending: false,
    updateBoardError: null,
    updatedBoard: null    
}

const updateBoardReducer = (state=initialState, action) => {
    switch(action.type){
        case BOARDS_TYPES.BOARDS_EDIT_START:
            return {...state, updateBoardPending: true}
        case BOARDS_TYPES.BOARDS_EDIT_SUCCESS:
            return {...state, updateBoardPending: false, updatedBoard: action.payload, updateBoardError: null }
        case BOARDS_TYPES.BOARDS_EDIT_ERROR:
            return {...state, updateBoardPending: false, updateBoardError: action.payload}

    
        default: 
            return state
    }
}

export default updateBoardReducer

