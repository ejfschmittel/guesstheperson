import BOARDS_TYPES from "../boards.types"


const initialState = {
    createBoardPending: false,
    createBoardError: null,
    createdBoard: null    
}

const createBoardReducer = (state=initialState, action) => {
    switch(action.type){
        case BOARDS_TYPES.BOARDS_CREATE_START:
            return {...state, createBoardPending: true}
        case BOARDS_TYPES.BOARDS_CREATE_SUCCESS:
            return {...state, createBoardPending: false, createdBoard: action.payload, createBoardError: null }
        case BOARDS_TYPES.BOARDS_CREATE_ERROR:
            return {...state, createBoardPending: false, createBoardError: action.payload}

    
        default: 
            return state
    }
}

export default createBoardReducer

