import React from 'react';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    //obtenemos las notas de nuestro state
    const { notes } = useSelector(state => state.notes);

    return (
        // Aquí es necesario pasar las properties como argumentos
        //ya que cada nota es diferente y requiere un key unico
        <div className="journal__entries">
            {
                notes.map(note => (
                    <JournalEntry 
                        key={note.id} 
                        {...note}
                    />
                ))
            }
        </div>
    )
}
