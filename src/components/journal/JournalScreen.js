import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {

    //extraemos la nota que el usuario seleccione
    const { active } = useSelector(state => state.notes);

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">

            <Sidebar />

            <main>

                {
                    //si se selecciono una nota, la muestra, caso contrario muestra otra screen
                    (active)
                        ? (< NoteScreen />)
                        : (<NothingSelected />)
                }

            </main>


        </div>
    )
};
