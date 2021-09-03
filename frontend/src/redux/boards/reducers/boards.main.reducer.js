import BOARDS_TYPES from "../boards.types"

const initialState = {
    fetchAllPending: false,
    fetchAllError: null,
    fetchOnePending: false,
    fetchOneError: null,
    byId: {},
    list: []
}

const boardsMainReducer = (state=initialState, action) => {
    console.log("hello")
    switch(action.type){

        case BOARDS_TYPES.BOARDS_FETCH_ALL_START:
            return {...state, fetchAllPending: true}

        case BOARDS_TYPES.BOARDS_FETCH_ALL_SUCCESS:
            console.log("on success")
            return {...state, 
                fetchAllPending: false, 
                byId: action.payload.reduce((res, board) => ({...res, [board.id]: board }), {}),
                list: action.payload.map(board => board.id)
            }
        case BOARDS_TYPES.BOARDS_FETCH_ALL_ERROR:
            return {...state, fetchAllPending: false, fetchAllError: action.payload}


        case BOARDS_TYPES.BOARDS_CREATE_SUCCESS:
            return {
                ...state, 
                byId: {...state.byId, [action.payload.id]: action.payload},
                list: [action.payload.id, ...state.list]
            }
        default:
            return state
    }
}

export default boardsMainReducer