import {API_BASE_URL} from "../../utils/urls.utils"
import { validate } from "../../utils/validation.utils"

const USER_BASE_URL = API_BASE_URL + "users/"
const LOGIN_URL = USER_BASE_URL + "login/"



const login = async (userLoginDto) => {

    validate(userLoginDto, {
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
    }).then(res => res.json())
}

export default {
    login
}
