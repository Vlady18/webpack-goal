import React from 'react';
import style from './Notification.module.sass';

const Notification = ({notification}) => {
    return (
        <>
            <div className={`${style.Notification} ${notification ? style.active : ''}`}>
                <p>
                    This letter is entered.
                </p>
            </div>
        </>
    );
};

export default Notification;
