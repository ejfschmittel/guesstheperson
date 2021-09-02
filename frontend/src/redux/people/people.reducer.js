
import PEOPLE_TYPES from "./people.types"
import {combineReducers} from "redux"
import peopleReducer from "./reducers/fetch.reducer"
import createPersonReducer from "./reducers/create.reducer"


export default combineReducers({
    create: createPersonReducer,
    people: peopleReducer
})