import {getAuthToken} from "../../utils/jwt.utils"
import {API_BASE_URL} from "../../utils/urls.utils"
import {validate} from "../../utils/validation.utils"

const PEOPLE_BASE_URL = API_BASE_URL + "people/"



const deletePerson = (personId) => {

    const PEOPLE_DELETE_URL = PEOPLE_BASE_URL + `${personId}`

    return fetch(PEOPLE_DELETE_URL, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    }).then(res => res.json())
}

const createPerson = (createPersonDto) => {

    validate(createPersonDto, {
        name: {
            exists: true,
            max: 20,
        },
        image: {
            exists: true
        }
    })

    console.log(createPersonDto)

    const formData = new FormData()
    formData.append('name', createPersonDto.name)
    formData.append('image', createPersonDto.image)

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    console.log(formData)

    console.log(getAuthToken())

    return fetch(PEOPLE_BASE_URL, {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    }).then(res => res.json())
}

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
    fetchAllPeople,
    createPerson,
    deletePerson
}