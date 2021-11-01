import USER_TYPES from "./user.types"
import userService from "./user.service"
import history from "../../utils/history.utils"
import {getUserData, setAuthToken, removeAuthToken} from "../../utils/jwt.utils"
import {parseError} from "../../utils/errors.utils"

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

const login = (userLoginDto, redirectUrl="/") => (dispatch) => {
    dispatch(userLoginStart())



    userService.login(userLoginDto)
        .then(json => {
            const token = json.access_token;
            const user = getUserData(token);
            setAuthToken(token)
            dispatch(userLoginSuccess(token, user))
            
        })
        .catch(error => {
            const perparedErrors = parseError(error)
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


const register = (userRegisterDto) => (dispatch) => {
    dispatch(userRegisterStart())

    userService.register(userRegisterDto)
        .then(json => {
            dispatch(userRegisterSuccess(json))
            history.push({
                pathname: "/login",
                state: {registeredUser: userRegisterDto},
                forceRefresh: true,
            })
        })
        .catch(error => {
            const perparedErrors = parseError(error)
            dispatch(userRegisterError(perparedErrors))
        })
}

const logout = (redirectUrl) => {
    removeAuthToken();

    if(redirectUrl){
        history.push(redirectUrl)
    }

    return {
        type: USER_TYPES.LOGOUT_USER,
    }
}


const userActions =  {
    login,
    register,
    logout
}

export default userActions