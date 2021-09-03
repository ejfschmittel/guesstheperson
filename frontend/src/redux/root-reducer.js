  
import { combineReducers } from "redux"

import user from "./user/user.reducer"
import people from "./people/people.reducer"
import boards from "./boards/boards.reducer"

export default combineReducers({
    user,
    people,
    boards,
})