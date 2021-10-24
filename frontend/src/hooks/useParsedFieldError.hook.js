import {useMemo} from 'react'


export const useParsedFieldErrors = (errors) => {
    console.log(errors)
    const parsedErrors = useMemo(() => {

        const parsedErrors = {}
        if(errors && errors.data){

            Object.keys(errors.data).forEach((fieldKey) => {
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
