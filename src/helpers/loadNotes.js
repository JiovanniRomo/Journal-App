/*
    Lo colocamos aqui porque el código es largo y cargariamos mucho la acción
*/

import { db } from "../firebase/firebase-config"

export const loadNotes = async ( uid ) => {

    //Obtenemos el Snapshot de todas las notas de la colección del usuario (para eso el uid)
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();

    //Creamos un array que contendrá todas las notas
    const notes = [];

    //Hacemos un forEach y le inyectamos cada nota al array de notes
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    
    //Si habia notas, las retorna, sino, regresa un array vacio
    return notes;
}