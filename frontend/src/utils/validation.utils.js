


const ERROR_KEYS = {
    EXISTS: "exists",
    MIN: "min",
    MAX: "max",
}






const DEFAULT_ERROR_VALIDATORS = {
    [ERROR_KEYS.EXISTS]: {
        value: undefined,
        pass: (value, validatorValue) => {
            console.log("validat e xists")
            return !!value || value !== ""
        },
        errorMessage: (value, validatorValue, dataKey, errorKey) => `${dataKey} cannot be empty!`, 
    },

    [ERROR_KEYS.MIN]: {
        value: 3,
        pass: (value, validatorValue) => value.length >= validatorValue,
        errorMessage: (value, validatorValue, dataKey, errorKey) => `${dataKey} has to be at least ${validatorValue} characters long!`, 
    },

    [ERROR_KEYS.MAX]: {
        value: 30,
        pass: (value, validatorValue) => !!value,
        errorMessage: (value, validatorValue, dataKey, errorKey) => `${dataKey} has to be shorter thatn ${validatorValue} characters!`, 
    },
}



export class ValidationError extends Error {
    constructor(message,errors){
        super(message)
        this.errors = errors;
    }

    getValidationErrors(){
        return this.errors;
    }
}


export const prepareErrors = (errors) => {
    if( errors instanceof ValidationError){
        return errors.getValidationErrors()
    }
    return errors;
}

export const validate = (data, validators) => {
    const errors = {}

    console.log(data)
    const validatorKeys = Object.keys(validators);
    for(let i = 0; i < validatorKeys.length; i++){
      
        
        const fieldKey = validatorKeys[i];
        const value = data[fieldKey];
        const fieldValidators = validators[fieldKey]
        if(value == undefined ) continue;
        const fieldErrors = validateField(fieldKey, value, fieldValidators)
  

        if(!isEmptyObject(fieldErrors)){
            errors[fieldKey] = fieldErrors
        }
    }


    if(!isEmptyObject(errors)){
        console.log("thow new validation error")
        throw new ValidationError("validation error", errors)
    }
}


const isEmptyObject = (obj) => JSON.stringify(obj) === JSON.stringify({})


const validateField = (dataKey, value, fieldValidators) => {
    let fieldErrors = {}
    const fieldValidatorKeys = Object.keys(fieldValidators);
 

    for(let i = 0; i < fieldValidatorKeys.length; i++){

  
        const validationKey = fieldValidatorKeys[i];
        const validationObject = getValidationObject(validationKey, fieldValidators) 

        if(!validationObject.pass(value, validationObject.value)){
            fieldErrors = {
                ...fieldErrors,
                [validationKey]: validationObject.errorMessage(value, validationObject.value, dataKey, validationKey)
            }
        }
    }

    return fieldErrors
}

const getValidationObject = (key, validators) => {
    const validator = validators[key];

    let combinedValidator = typeof validator === 'object' && validator !== null ? 
        validator : {value: validator}; 

    return{
        ...DEFAULT_ERROR_VALIDATORS[key],
        ...combinedValidator
    }
}

