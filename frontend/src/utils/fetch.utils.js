class HTTPError extends Error{
    constructor(message, status, response){
        super(message);
        this.response = response
        this.status = status
    }

    getStatus = () => this.status
    getInfo = () => this.response;
}

export const handleFetchResponse = (response) => {
    if(response.ok){
        return response.json();
    }else{
        console.log(response)
        

        return response.json().then((json) => {
            throw new HTTPError(`(Status: ${response.status}) ${response.statusText}`, response.status, json)
        })
    }
}