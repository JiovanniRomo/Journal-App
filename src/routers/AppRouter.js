import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    //Creamos 2 banderas que nos serviran para comprobaciones
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {

        //Oservable que detectará si hay cambios en el usuario
        firebase.auth().onAuthStateChanged(async (user) => {

            //si existe el objeto user, preguntamos por el uid
            if (user?.uid) {

                //enviamos la info de inicio de sesión, para que no se borre al recargar
                dispatch(login(user.uid, user.displayName));

                //indicamos que el usuario esta loggeado
                setIsLoggedIn(true);

                //empezamos a cargar las notas
                dispatch(startLoadingNotes(user.uid));

            } else {

                //si no pasa el if, el usuario no esta loggeado, o existe o algo
                setIsLoggedIn(false);
            }

            //como ya realizo las comprobaciones, no estamos buscando o esperando nada
            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn])


    //Si aun estamos esperando algo, mostramos un pequeño mensaje
    if (checking) {
        return (
            <h1>You look beautiful waiting, wait a little bit more</h1>
        )
    }


    return (
        // Protección de nuestras rutas
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
