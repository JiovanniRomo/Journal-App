import { useState } from 'react';


//el initialState es un objeto ya que en el component usamos un objeto para los valores del form
export const useForm = (initialState = {}) => {
    
    const [values, setvalues] = useState(initialState);

    //Si el newFormState no recibe nada, entonces será el initialState
    const reset = ( newFormState = initialState ) => {
        setvalues(newFormState);
    };

    const handleInputChange = ({target}) => {
        setvalues({
            ...values,
            [target.name]: target.value
        });
    };

    return [
        values,
        handleInputChange,
        reset
    ];

}