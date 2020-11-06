import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { JournalEntries } from './JournalEntries'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const dispatch = useDispatch();

    //Extraemos el name del usuario de nuestro state.auth (donde se guarda la info de inicio de sesión)
    const { name } = useSelector(state => state.auth);

    //Cerramos la sesión del usuario
    const hanleLogout = () => {
        dispatch(startLogout())
    };

    //Creamos el mmetodo para agregar una nueva nota
    //puedes ver como la crea analizando startNewNote
    const handleAddNew = () => {
        dispatch(startNewNote());
    };

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {name} </span>
                </h3>

                <button
                    className="btn"
                    onClick={hanleLogout}
                >
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry" 
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />

        </aside>
    )
}
