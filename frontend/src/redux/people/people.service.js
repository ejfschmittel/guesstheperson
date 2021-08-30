import {getAuthToken} from "../../utils/jwt.utils"
import {API_BASE_URL} from "../../utils/urls.utils"

const PEOPLE_BASE_URL = API_BASE_URL + "people/"

const fetchAllPeople = () =>{
    return fetch(PEOPLE_BASE_URL, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer '+getAuthToken(),
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export default {
    fetchAllPeople
}