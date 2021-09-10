import {getAuthToken} from "../../utils/jwt.utils"
import {API_BASE_URL} from "../../utils/urls.utils"
import {validate} from "../../utils/validation.utils"
import {handleFetchResponse} from "../../utils/fetch.utils"

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

const fetchOne = (id) => {
    const URL = BOARDS_BASE_URL + id
    return fetch(URL, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    }).then(handleFetchResponse)
}

const updateBoard = (id,updateBoardDto) => {
    
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


const boardServices = {
    fetchAll,
    fetchOne,
    createBoard,
    updateBoard
}

export default boardServices