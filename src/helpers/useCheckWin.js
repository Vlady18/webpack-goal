import { useMemo } from 'react';

export const useCheckWin = (wrongLetters, correctLetters, selectedWord) => useMemo(() => {
    let win = 'win';

    selectedWord.split('').map(el => {
       if(correctLetters.indexOf(el) === -1) {
           win = '';
       }
    });

    if (wrongLetters.length >= 6) {
        win = 'lose';
    }

    return win;
}, [wrongLetters, correctLetters, selectedWord]);
