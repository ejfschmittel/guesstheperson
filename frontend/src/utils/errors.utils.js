

// check which type error is and handle it accordingly to get uniform error object in response
export const parseError = (error) => {
    if(error instanceof FormError){
        return parseFormError(error)
    }else if(error instanceof HTTPError){
        return parseHTTPError(error)
    }
    return parseStandardError(error);
}

const ERROR_TYPES = {
    HTTP_ERROR: "HTTP_ERROR",
    FORM_ERROR: "FORM_ERROR",
    STANDARD_ERROR: "STANDARD_ERROR",
}

const getEmptyUniversalErrorObject = () => ({
    primaryMessage: "Something went wrong.",
    type: ERROR_TYPES.STANDARD_ERROR,
    status: null,
    data: {}
})

const parseFormError = (error) => {
    console.log("**HTTP_ERROR**")
    console.error(error)
    const errorObject = getEmptyUniversalErrorObject()
    errorObject.primaryMessage = getPrimaryMessageFromFormError(error);
    errorObject.type = ERROR_TYPES.FORM_ERROR;
    errorObject.status = 400;
    errorObject.data = error.data;
    return errorObject;
}

const getPrimaryMessageFromFormError = (error) => {
    const firstFieldErrors = error.data[Object.keys(error.data)[0]]
    console.log(firstFieldErrors)
    const firstFieldError = firstFieldErrors[Object.keys(firstFieldErrors)[0]]
    return firstFieldError;
}

const parseHTTPError = (error) => {
    console.log("**HTTP_ERROR**")
    console.error(error)


    const errorObject = getEmptyUniversalErrorObject()
    errorObject.type = ERROR_TYPES.HTTP_ERROR;
    errorObject.status = error.status;
    errorObject.data = error.data;
    errorObject.primaryMessage = getPrimaryMessageFormHttpError(error)
    return errorObject;
}

const getPrimaryMessageFormHttpError = (errorObject) => {
    if(Array.isArray(errorObject.data) && errorObject.data.length > 0){
        errorObject.primaryMessage = errorObject.data[0]
    }else if(typeof errorObject.data === 'string' || errorObject.data instanceof String){
        return errorObject.data;
    }

    return "Something went wrong. Try again."
}

const parseStandardError = (error) => {
    console.error(error)
    return getEmptyUniversalErrorObject()
}


export const displayErrorMessage = (error, field=null) => {

}


export class HTTPError extends Error{
    constructor(message, status, data){
        super(message)
        this.status = status;
        this.data = data;
    }
}

export class FormError extends Error{
    constructor(message, data){
        super(message)
        this.status = 400;
        this.data = data;
    }
}