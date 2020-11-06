import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetNote } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    //extraemos la nota activa ya para que el usuario la modifique
    const {active} = useSelector( state => state.notes );

    //Una vez ha modificado la nota, la enviamos para que la actualice en la bd
    //y en la intefaz de la app
    const handleSave = () => {
        dispatch(startSetNote(active));
    };

    return (
        <div className="notes__appbar">
            <span>25 de octubre 2020</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
