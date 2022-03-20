import React from 'react';
import style from './Header.module.sass';

const Index = () => {
    return (
        <div className={style.header}>
            <h1>Hangman</h1>
            <p>Find the hidden word - Enter a letter</p>
        </div>
    );
};

export default Index;
