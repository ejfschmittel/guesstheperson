  
import { combineReducers } from "redux"

import user from "./user/user.reducer"
import people from "./people/people.reducer"

export default combineReducers({
    user,
    people,
})