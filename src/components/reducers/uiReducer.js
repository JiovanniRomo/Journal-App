import { types } from "../../types/types";

const initialState = {
    loading: false,
    msgError: null
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {

        //Creamos el mensae de error
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            };

        //Si no hay error, simplemente establecemos el valor a null
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            };

        //EStablecemos el loading en true, para que funcione
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            };

        //Si ya no es necesario el loading o ya ha cargado lo que queremos, lo desactivamos
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            };



        default:
            return state;
    }
};