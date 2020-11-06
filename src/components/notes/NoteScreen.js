import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title } = formValues;

    const activeId = useRef(note.id);


    useEffect(() => {

        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id
        }

    }, [note, reset]);

    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }));


    }, [formValues, dispatch]);

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
                    (note.url) &&
                    <div className="notes__image">

                        <img
                            src="data:image/jpeg;base64,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"
                            alt="imagen"
                        />
                    </div>
                }


            </div>

        </div>
    )
}
