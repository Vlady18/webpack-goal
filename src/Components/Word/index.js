import React from 'react';

import style from './Word.module.sass';

const Word = ({ selectedWord, correctLetters }) => {
    return(
      <div className={style.word}>
          {selectedWord.split('').map((el, i) => <span key={i}>
              {correctLetters.indexOf(el) !== -1 ? el : null }
          </span>)}
      </div>
    );
};

export default Word;
