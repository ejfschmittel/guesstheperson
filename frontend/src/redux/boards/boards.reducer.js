
import {combineReducers} from "redux"
import BOARDS_TYPES from "./boards.types"
import boardsMainReducer from "./reducers/boards.main.reducer"
import createBoardReducer from "./reducers/boards.create.reducer"

export default combineReducers({
    boards: boardsMainReducer,
    create: createBoardReducer,
    //edit:
})