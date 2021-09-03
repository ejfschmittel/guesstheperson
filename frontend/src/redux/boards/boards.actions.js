import BOARDS_TYPES from "./boards.types"
import boardsServices from "./boards.services"


const createBoard = (createBoardDto) => dispatch => {
    const createBoardStart = () => ({
        type: BOARDS_TYPES.BOARDS_CREATE_START
    })

    const createBoardSuccess = (boards) => ({
        type: BOARDS_TYPES.BOARDS_CREATE_SUCCESS,
        payload: boards
    })

    const createBoardError = (errors) => ({
        type: BOARDS_TYPES.BOARDS_CREATE_ERROR,
        payload: errors,
    })

    dispatch(createBoardStart())

    console.log("call boards service")

    boardsServices.createBoard(createBoardDto)
        .then(json => {
            console.log("success")
            dispatch(createBoardSuccess(json))
        })
        .catch(errors => {
            console.log(errors)
            dispatch(createBoardError(errors))
        })   
}

// fetches all user boards
const fetchAllBoards = () => dispatch => {
    const fetchAllBoardsStart = () => ({
        type: BOARDS_TYPES.BOARDS_FETCH_ALL_START
    })

    const fetchAllBoardsSuccess = (boards) => ({
        type: BOARDS_TYPES.BOARDS_FETCH_ALL_SUCCESS,
        payload: boards
    })

    const fetchAllBoardsError = (errors) => ({
        type: BOARDS_TYPES.BOARDS_FETCH_ALL_ERROR,
        payload: errors,
    })

    dispatch(fetchAllBoardsStart())

    boardsServices.fetchAll()
        .then(json => {
            dispatch(fetchAllBoardsSuccess(json))
        })
        .catch(errors => {
            console.log(errors)
            dispatch(fetchAllBoardsError(errors))
        })   
}


export default {
    fetchAllBoards,
    createBoard
}