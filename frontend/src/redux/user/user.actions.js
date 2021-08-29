import USER_TYPES from "./user.types"
import userService from "./user.service"
import {prepareErrors} from "../../utils/validation.utils"
import {getUserData, setAuthToken, removeAuthToken} from "../../utils/jwt.utils"


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


const userRegisterStart = () => ({
    type: USER_TYPES.REGISTER_USER_PENDING,
})

const userRegisterSuccess = (user) => ({
    type: USER_TYPES.REGISTER_USER_SUCCESS,
    payload: user
})

const userRegisterError = (error) => ({
    type: USER_TYPES.REGISTER_USER_ERROR,
    payload: error
})


const register = (userLoginDto) => (dispatch) => {
    dispatch(userRegisterStart())

    userService.register(userLoginDto)
        .then(json => {
            dispatch(userRegisterSuccess(json))
        })
        .catch(error => {
            const perparedErrors = prepareErrors(error)
            dispatch(userRegisterError(perparedErrors))
        })
}

const logout = () => {
    removeAuthToken();

    return {
        type: USER_TYPES.LOGOUT_USER,
    }
}


export default {
    login,
    register,
    logout
}