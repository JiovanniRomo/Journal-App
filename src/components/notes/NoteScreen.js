import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    //extraemos la nota activa
    const { active: note } = useSelector(state => state.notes);

    //Hacemos el manejo del formulario
    const [formValues, handleInputChange, reset] = useForm(note);

    //Extraemos los nombres de los inputs
    const { body, title, id } = formValues;

    //Creamos una variable mutable que no redibujará al componente
    const activeId = useRef(note.id);


    useEffect(() => {

        //Si el id de nuestra nota activa es diferente al falmacenado en activeId
        //enonces reseteamos el formulario y establecemos el nuevo id
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id
        }

    }, [note, reset]);

    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }));


    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happend today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    (note.url_image) &&
                    <div className="notes__image">

                        <img
                            src={note.url_image}
                            alt="imagen"
                        />
                    </div>
                }

                <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </div>

        </div>
    )
}
