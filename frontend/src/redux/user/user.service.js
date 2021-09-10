import {API_BASE_URL} from "../../utils/urls.utils"
import { validate } from "../../utils/validation.utils"
import {handleFetchResponse} from "../../utils/fetch.utils"

const USER_BASE_URL = API_BASE_URL + "users/"
const LOGIN_URL = USER_BASE_URL + "login/"



const login = async (userLoginDto) => {

    validate(userLoginDto, {
        email: {
            exists:true,
        },
        password: {
            exists: true
        }
    })
    

    return fetch(LOGIN_URL, {
        method: "post",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(userLoginDto)
    }).then(handleFetchResponse)
}


const register = async (userRegisterDto) => {

    validate(userRegisterDto, {
        email: {
            exists: true,
        },
        name: {
            exists: true,
        },
        password: {
            exists: true
        }
    })
    

    return fetch(USER_BASE_URL, {
        method: "post",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(userRegisterDto)
    }).then(handleFetchResponse)
}

const userServices = {
    login,
    register
}

export default userServices 
