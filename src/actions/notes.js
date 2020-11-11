import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


//Acción apra crear una nueva nota
export const startNewNote = () => {
    return async (dispatch, getState) => {

        //Necesitamos el uid del usuario para saber donde guardar la nota
        const { uid } = getState().auth;

        //InitialState de la nueva nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        //hacemos referencia al documento con el id del usuario donde vamos a agregar la nota
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        //una vez agregada la nota, necesitamos que se active para que el usuario pueda modificarla
        dispatch(activeNote(doc.id, newNote));
    };
};


//Acción para activar la edición de la nota,
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});


//Acción para cargar las notas
export const startLoadingNotes = (uid) => {
    return async (dispatch) => {

        //Esperamos que se traigan las notas (revisar loadNotes)
        const notes = await loadNotes(uid);

        //Una vez obtenidas las notas, las mandamos al store
        dispatch(setNotes(notes));
    }

}

//Acción para agregar las notas 
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});


//Acción para actualizar la nota, en realidad debe ser startSaveNote, me equivoqué, xD
export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        //Necesitamos el id del usuario para saber quien guardará sus notas
        const { uid } = getState().auth;

        //Firebase no acepta undefined o null, así que si no hay imagen,
        //se elimina el url de la nota
        if (!note.url_image) {
            delete note.url_image;
        }

        //Duplicamos la nota
        const noteToFirestore = { ...note };

        //Pero como el id no se registra en la bd, la eliminamos de la nota que se SUBIRÁ a Firebase
        delete noteToFirestore.id;

        //Usamos note.id y no noteToFirestore porque en este ultimo eliminamos el id, ya que no queremos 
        //guardarlo en la nota, puesto que ya lo tiene
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Save', note.title, 'success');
    }
};

//Acción síncrona que se encarga de mandar al reducer la nota actualizada
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

//Acción para subir una imagen ya ctualizar el url de la nota
export const startUploading = (file) => {
    return async(dispatch, getState) => {

        //extraemos la nota activa, para cambiarla
        const { active: activeNote } = getState().notes;

        //Mostramos un pequeño loading
        Swal.fire({
            title:'Uploading...',
            text: 'Please Wait...',
            allowOutsideClick:false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        //Guardamos el url de la imagen (VER: fileUpload)
        const fileUrl = await fileUpload(file);

        //Asignamos el url de la nota activa
        activeNote.url_image = fileUrl;

        //ahora lo actualizamos en fireBase
        dispatch(startSaveNote(activeNote));

        //Cerramos el loading
        Swal.close();
    }
};

// react-journal