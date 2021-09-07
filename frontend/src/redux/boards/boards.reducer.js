
import {combineReducers} from "redux"
import boardsMainReducer from "./reducers/boards.main.reducer"
import createBoardReducer from "./reducers/boards.create.reducer"
import updateBoardReducer from "./reducers/boards.edit.reducer"

export default combineReducers({
    boards: boardsMainReducer,
    create: createBoardReducer,
    edit: updateBoardReducer,
})