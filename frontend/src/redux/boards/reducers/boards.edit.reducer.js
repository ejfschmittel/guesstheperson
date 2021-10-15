import BOARDS_TYPES from "../boards.types"



const initialState = {
    editBoardPending: false,
    editBoardError: null,
    editedBoard: null    
}

const updateBoardReducer = (state=initialState, action) => {
    switch(action.type){
        case BOARDS_TYPES.BOARDS_EDIT_START:
            return {...state, editBoardPending: true}
        case BOARDS_TYPES.BOARDS_EDIT_SUCCESS:
            return {...state, editBoardPending: false, editedBoard: action.payload, editBoardError: null }
        case BOARDS_TYPES.BOARDS_EDIT_ERROR:
            return {...state, editBoardPending: false, editBoardError: action.payload}

    
        default: 
            return state
    }
}

export default updateBoardReducer

