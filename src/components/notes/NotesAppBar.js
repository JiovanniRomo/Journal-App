import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    //extraemos la nota activa ya para que el usuario la modifique
    const { active } = useSelector(state => state.notes);

    //Una vez ha modificado la nota, la enviamos para que la actualice en la bd
    //y en la intefaz de la app
    const handleSave = () => {
        dispatch(startSaveNote(active));
    };

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = (e.target.files[0]);

        if(file){
            dispatch(startUploading(file));
        }
    };

    return (
        <div className="notes__appbar">
            <span>25 de octubre 2020</span>


            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <div>
                <button
                    className="btn"
                    onClick={handlePictureUpload}
                >
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
