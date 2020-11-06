import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, date, url_image }) => {

    const dispatch = useDispatch();

    //Convertimos la fecha en un formato más legible
    const noteDate = moment(date);

    //Establecemos que nota cliqueo el usuario para que la app la renderice
    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            title, body, date, url_image
        }));
    };

    return (
        <div 
            className="journal__entry pointer"
            onClick={handleEntryClick}
        >


            {
                //Si el url de la imagen es diferente a null, la muestra
                url_image &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url_image})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>

                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
};
