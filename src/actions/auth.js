import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogOut } from './notes';
import { startLoading, finishLoading } from './ui';


//Acción ascíncrona para que el usuario inicie sesión con Email y password
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        //Informamos que estamos cargando la data
        dispatch( startLoading() );


        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {

                //una vez tenemos la data del usuario, la establecemos
                dispatch(login( user.uid, user.displayName ));

                //Como ya tenemos la data, no es necesario un loading
                dispatch( finishLoading() );
            })
            .catch( e => {

                //pero si algo falla, le informamos al ususario
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Fail', e.message, 'error');

            });



    };
};


//Acción para registrarse con Email y password
export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        dispatch(startLoading());

        //Usamos el metodo de crear un usuario con Email y Password
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                //Displayname se usa con la cuenta de google, extrae el nombre,
                //pero como aquí el usuario lo manda, debemos actualizarlo con el que se envía
                await user.updateProfile({ displayName: name });

                //Una vez actualizamos el nombre, establecemos el usuario con la acción login
                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {

                //Si algo ocurrio, lo mostramos al usuario
                dispatch(finishLoading());
                Swal.fire('Fail', e.message, 'error');
            });

    };
};


//Acción para la autenticación con Gooogle
export const startGoogleLogin = () => {
    return ( dispatch ) => {

        //Hacemos un PopUp del inicio de sesión de Google
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {

                //Unz vez tenemos la información, hacemos un dispatch de los datos del user
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    };
};

//Acción para establecer al usuario
export const login = (uid, displayName) => ({
    type: types.login,

    //mandamos los datos el user al reducer para establecerlos
    payload: {
        uid,
        displayName
    }
});

//Acción para cerrar sesión de firebase
export const startLogout = () => {
    return async( dispatch ) => {

        //Esperamos que se cierre sesión de firebase
        await firebase.auth().signOut();

        //Informamos que el usuario ya se ha deslogueado
        dispatch( logout() );

        //aquí
        dispatch(noteLogOut());
    };
};

//Acción para indicar el cierre de sesión del usuario, limpia la sesión
export const logout = () => ({
    type: types.logout
});
