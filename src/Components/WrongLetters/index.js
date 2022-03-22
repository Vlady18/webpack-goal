import React from 'react';

import style from './WrongLetters.module.sass';

const WrongLetters = ({wrongLetters, alphabet}) => {
    return (
        <div>
            {alphabet.map((el, i) => <span
                key={i}
                className={`${style.letter} ${wrongLetters.includes(el) ? style.wrongLetter : null}`}>
                    {el}
            </span>
            )}
        </div>
    );
};

export default WrongLetters;