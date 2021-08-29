import USER_TYPES from "./user.types"
import userService from "./user.service"
import {prepareErrors} from "../../utils/validation.utils"
import {getUserData, setAuthToken} from "../../utils/jwt.utils"


const userLoginStart = () => ({
    type: USER_TYPES.LOGIN_USER_PENDING,
})

export const userLoginSuccess = (token, user) => ({
    type: USER_TYPES.LOGIN_USER_SUCCESS,
    payload: {
        token,
        user
    }
})

const userLoginError = (error) => ({
    type: USER_TYPES.LOGIN_USER_ERROR,
    payload: error
})

const login = (userLoginDto) => (dispatch) => {
    dispatch(userLoginStart())



    userService.login(userLoginDto)
        .then(json => {
            console.log(json)
            const token = json.access_token;
            const user = getUserData(token);
            setAuthToken(token)
            dispatch(userLoginSuccess(token, user))
        })
        .catch(error => {
            console.log(error)
            const perparedErrors = prepareErrors(error)
            dispatch(userLoginError(perparedErrors))
        })
}

export default {
    login
}