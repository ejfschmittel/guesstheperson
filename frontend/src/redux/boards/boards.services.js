import {getAuthToken} from "../../utils/jwt.utils"
import {API_BASE_URL} from "../../utils/urls.utils"
import {validate} from "../../utils/validation.utils"
import {handleFetchResponse} from "../../utils/fetch.utils"


const BOARDS_BASE_URL = API_BASE_URL + "boards/"

const createBoard = async (createBoardDto) => {

    validate(createBoardDto,{
        title: {exists: true}
    })

    return fetch(BOARDS_BASE_URL, {
        method: "POST",
        body: JSON.stringify(createBoardDto),
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }
    }).then(handleFetchResponse)
}

const fetchAll = () => {
    return fetch(BOARDS_BASE_URL, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    }).then(res => res.json())
}

const fetchOne = async (id) => {
    const URL = BOARDS_BASE_URL + id
    return fetch(URL, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    }).then(handleFetchResponse)
}

const updateBoard = async (id,updateBoardDto) => {
    
    validate(updateBoardDto,{
        title: {exists: true}
    })

    const URL = BOARDS_BASE_URL + id;
    return fetch(URL, {
        method: "PUT",
        body: JSON.stringify(updateBoardDto),
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }
    }).then(handleFetchResponse)
}


const deleteBoard = async (id) => {
    const URL = BOARDS_BASE_URL + id;
    return fetch(URL, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    }).then(handleFetchResponse)
}

const boardServices = {
    fetchAll,
    fetchOne,
    createBoard,
    updateBoard,
    deleteBoard
}

export default boardServices