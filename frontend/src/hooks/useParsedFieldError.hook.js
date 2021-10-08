import React, {useMemo} from 'react'


export const useParsedFieldErrors = (errors) => {
    console.log(errors)
    const parsedErrors = useMemo(() => {
        console.log("use memo")
        const parsedErrors = {}
        if(errors && errors.data){
            console.log("recheck error")
            Object.keys(errors.data).map((fieldKey) => {
                // get first error of field
                const errorKey = Object.keys(errors.data[fieldKey])[0]
                const firstErrorMessage = errors.data[fieldKey][errorKey];
                parsedErrors[fieldKey] = firstErrorMessage
            })
        }
        return parsedErrors;
    }, [errors])

    return parsedErrors
}
