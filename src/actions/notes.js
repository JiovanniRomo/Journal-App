import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }

}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSetNote = (note) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        if(!note.url_image){
            delete note.url_image;
        }
        
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        //usamos note.id y no noteToFirestore porque en este ultimo eliminamos el id, ya que no queremos 
        //guardarlo en la nota, puesto que ya lo tiene
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Save', note.title, 'success');
    }
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
});