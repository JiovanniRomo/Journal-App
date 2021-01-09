/*

    {
        notes: [],
        active: null,
        active: {
            id: firebase,
            title: '',
            body: '',
            image_url: '',
            date: 2020/01/11
        }
    }

*/

import { types } from "../../types/types";

const initialState = {
    notes: [],
    active: null
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            };

        //En el state se mostrará el array con todas nuestras notas
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            };

        case types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes]
            }

        case types.notesUpdated:
            return {
                //EL condicionas basicamente es:
                // si el id de la nota es igual al id del payload, regresamos la nueva nota, sino, regresamos la notas
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id   
                        ? action.payload.note
                        : note
                )
            };

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload)
            }

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }


        default:
            return state;
    }
};