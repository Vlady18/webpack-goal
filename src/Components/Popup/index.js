import React, { useEffect } from 'react';
import { useCheckWin } from '../../helpers/useCheckWin';

import style from './Popup.module.sass';

const Popup = ({ wrongLetters, correctLetters, selectedWord, handlePlayAgain, setPlayable }) => {
    let message;
    let playable = true;

    const checkWin = useCheckWin(wrongLetters, correctLetters, selectedWord);

    if(checkWin === 'win') {
        message = 'You are winner :)';
        playable = false;
    }
    if(checkWin === 'lose') {
        message = 'You lose :)';
        playable = false;
    }

    useEffect(() => {
        setPlayable(playable);
    });

    return (
        <div className={style.popup} style={message ? {display: 'block'} : {display: 'none'} }>
            <p>{message}</p>
            <div><button onClick={handlePlayAgain}>Play again!!!</button></div>
        </div>
    );
};

export default Popup;
