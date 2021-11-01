import BOARDS_TYPES from "./boards.types"
import boardsServices from "./boards.services"
import {parseError} from "../../utils/errors.utils"
import history from "../../utils/history.utils"

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


    boardsServices.createBoard(createBoardDto)
        .then(json => {
            dispatch(createBoardSuccess(json))

            history.push({
                pathname: `/#/boards/${json.id}/edit`
            })
        })
        .catch(errors => {
            const parsedErrors = parseError(errors)
            dispatch(createBoardError(parsedErrors))
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
            dispatch(fetchAllBoardsError(errors))
        })   
}

const fetchOneBoard = (id) => dispatch => {

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
            dispatch(fetchOneBoardSuccess(json))
        })
        .catch(errors => {
            const parsedErrors = parseError(errors)
            dispatch(fetchOneBoardError(parsedErrors))
        })   
}


const updateBoard = (id, updateBoardDto) => dispatch => {

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
            dispatch(updateBoardSuccess(json))
        })
        .catch(errors => {
            dispatch(updateBoardError(errors))
        })   
}


const deleteBaord = (id) => dispatch => {

    const deleteBoardStart = () => ({
        type: BOARDS_TYPES.BOARDS_DELETE_START
    })

    const deleteBoardSuccess = (id) => ({
        type: BOARDS_TYPES.BOARDS_DELETE_SUCCESS,
        payload: id
    })

    const deleteBoardError = (errors) => ({
        type: BOARDS_TYPES.BOARDS_DELETE_ERROR,
        payload: errors,
    })

    dispatch(deleteBoardStart())

    boardsServices.deleteBoard(id)
        .then(json => {
            dispatch(deleteBoardSuccess(id))
            history.push({
                pathname: "/#/boards"
            })
        })
        .catch(errors => {
            const parsedErrors = parseError(errors)
            dispatch(deleteBoardError(parsedErrors))
        })   
}


const boardActions = {
    fetchAllBoards,
    fetchOneBoard,
    createBoard,
    updateBoard,
    deleteBaord
}

export default boardActions