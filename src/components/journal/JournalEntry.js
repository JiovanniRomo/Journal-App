import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, date, url_image }) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);

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
