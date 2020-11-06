import { types } from '../types/types';
import Swal from 'sweetalert2';

//Acción para establecer un error
export const setError = (err) => {

    //Primero, lo mostramos al usuario
    Swal.fire('Fail', err, 'error');

    //Le enviamos el error al reducer para que lo establezca
    return ({
        type: types.uiSetError,
        payload: err
    });
};

//Acción para eliminar el error
export const removeError = () => ({
    type: types.uiRemoveError
});

//Acción para empezar un loading
export const startLoading = () => ({
    type: types.uiStartLoading
});

//Acción para finalizar el loading
export const finishLoading = () => ({
    type: types.uiFinishLoading
});

