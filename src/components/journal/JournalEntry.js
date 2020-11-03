import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(data:image/png;base64,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)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo dia
                </p>

                <p className="journal__entry-content">
                    aLrTOF8bjbbvFulpyOeaXtNEXwmXfHzCF3rLLyDX9Mr7e5Fq
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>25</h4>
            </div>
        </div>
    )
};
