import { types } from "../../types/types";

/*
    {
        uid: 'jagdfjahdsf127362718',
        name: 'Fernando'
    }

*/
export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {

        //Establecemos el uid y el nombre del usuario segun lo que recibamos,
        //el claro ejemplo es el objeto debajo de la importación
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };

        //Como el usuario de desloggeo, ya no nos interesa la data, así que la limpiamos
        case types.logout:
                return { };
    
        default:
            return state;
    }

}