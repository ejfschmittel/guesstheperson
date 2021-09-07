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

const fetchOneBoard = (id) => dispatch => {
    console.log("fetch board")
    const fetchOneBoardStart = () => ({
        type: BOARDS_TYPES.BOARDS_FETCH_ONE_START
    })

    const fetchOneBoardSuccess = (board) => ({
        type: BOARDS_TYPES.BOARDS_FETCH_ONE_SUCCESS,
        payload: board
    })

    const fetchOneBoardError = (errors) => ({
        type: BOARDS_TYPES.BOARDS_FETCH_ONE_ERROR,
        payload: errors,
    })

    dispatch(fetchOneBoardStart())

    boardsServices.fetchOne(id)
        .then(json => {
            console.log("fetch board success")
            dispatch(fetchOneBoardSuccess(json))
        })
        .catch(errors => {
            console.log(errors)
            dispatch(fetchOneBoardError(errors))
        })   
}


const updateBoard = (id, updateBoardDto) => dispatch => {
    console.log("fetch board")
    const updateBoardStart = () => ({
        type: BOARDS_TYPES.BOARDS_EDIT_START
    })

    const updateBoardSuccess = (board) => ({
        type: BOARDS_TYPES.BOARDS_EDIT_SUCCESS,
        payload: board
    })

    const updateBoardError = (errors) => ({
        type: BOARDS_TYPES.BOARDS_EDIT_ERROR,
        payload: errors,
    })

    dispatch(updateBoardStart())

    boardsServices.updateBoard(id, updateBoardDto)
        .then(json => {
            console.log("fetch board success")
            dispatch(updateBoardSuccess(json))
        })
        .catch(errors => {
            console.log(errors)
            dispatch(updateBoardError(errors))
        })   
}



export default {
    fetchAllBoards,
    fetchOneBoard,
    createBoard,
    updateBoard,
}