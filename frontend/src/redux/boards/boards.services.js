import {getAuthToken} from "../../utils/jwt.utils"
import {API_BASE_URL} from "../../utils/urls.utils"
import {validate} from "../../utils/validation.utils"


const BOARDS_BASE_URL = API_BASE_URL + "boards/"

const createBoard = (createBoardDto) => {

    validate(createBoardDto,{
        title: {exists: true}
    })



    console.log(createBoardDto)
    return fetch(BOARDS_BASE_URL, {
        method: "POST",
        body: JSON.stringify(createBoardDto),
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

const fetchAll = () => {
    return fetch(BOARDS_BASE_URL, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    }).then(res => res.json())
}

export default {
    fetchAll,
    createBoard
}