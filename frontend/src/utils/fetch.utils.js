import {HTTPError} from "./errors.utils"

export const handleFetchResponse = (response) => {


    if(response.ok){
        return response.json();
    }else{
   
        return response.json().then((json) => {
            console.log("parsed response")
            console.log(json)
            throw new HTTPError(`(Status: ${response.status}) ${response.statusText}`, response.status, json.message)
        })
    }
}