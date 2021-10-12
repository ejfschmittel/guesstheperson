
import {FormError} from "./errors.utils"

const ERROR_KEYS = {
    EXISTS: "exists",
    MIN: "min",
    MAX: "max",
    IS_EMAIL: "is_email"
}






const DEFAULT_ERROR_VALIDATORS = {
    [ERROR_KEYS.EXISTS]: {
        value: undefined,
        pass: (value, validatorValue) => {
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
        pass: (value, validatorValue) => value.length <= validatorValue,
        errorMessage: (value, validatorValue, dataKey, errorKey) => `${dataKey} has to be shorter than ${validatorValue} characters!`, 
    },
    [ERROR_KEYS.IS_EMAIL]: {
        value: undefined,
        pass: (value, validatorValue) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(value)
        },
        errorMessage: (value, validatorValue, dataKey, errorKey) => `'${value}' is not a valid email.`,
    }
}






export const validate = (data, validators) => {
    const errors = {}

    console.log(data)
    const validatorKeys = Object.keys(validators);
    for(let i = 0; i < validatorKeys.length; i++){
      
        
        const fieldKey = validatorKeys[i];
        const value = data[fieldKey];
        const fieldValidators = validators[fieldKey]
        if(value === undefined ) continue;
        const fieldErrors = validateField(fieldKey, value, fieldValidators)
  

        if(!isEmptyObject(fieldErrors)){
            errors[fieldKey] = fieldErrors
        }
    }


    if(!isEmptyObject(errors)){
        throw new FormError("validation error", errors)
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

