import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const JournalApp = () => {

    //Al ser el punto más alto de nuestra app, es un HOC (el index no vale, dejalo limpio),
    //así que aquí proveeremos el acceso a la store

    return (
        <div>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </div>
    )
}
