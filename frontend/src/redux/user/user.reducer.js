import USER_TYPES from "./user.types"
import {getAuthToken, parseJwt, isExpired} from "../../utils/jwt.utils"



  const token = getAuthToken();
  let user = null;
  if(token){

    const parsedToken = parseJwt(token);
    isExpired(parsedToken)
    console.log(parsedToken)
    user = parsedToken.user
  }




const initalState = {
    user: user,
    userLoginPending: false,
    userLoginError: null,
    auth_token: token,


    registeredUser: null,
    registerUserPending: false,
    registerUserError: null,
}

const userReducer = (state = initalState, action) => {
    switch(action.type){
        case USER_TYPES.REGISTER_USER_SUCCESS:
            return {...state, registeredUser: action.payload, registerUserPending: false, registerUserError: null}
        case USER_TYPES.REGISTER_USER_PENDING:
            return {...state, registeredUser: action.payload, registerUserPending: true}
        case USER_TYPES.REGISTER_USER_ERROR:
            return {...state, registeredUser: null, registerUserPending: false, registerUserError: action.payload}


        case USER_TYPES.LOGIN_USER_PENDING:
            return {...state, userLoginPending: true}
        case USER_TYPES.LOGIN_USER_SUCCESS:
            console.log("login user success")
            console.log(action.payload)
            return {...state, userLoginPending: false, user: action.payload.user, auth_token: action.payload.token, userLoginError: null}
        case USER_TYPES.LOGIN_USER_ERROR:
            return {...state, userLoginPending: false, userLoginError: action.payload}

        case USER_TYPES.LOGOUT_USER:
            return {...state, user: null, auth_token: null}
        default:
            return state;
    }
}

export default userReducer;