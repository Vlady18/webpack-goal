import React, { useEffect, useState } from 'react';
import WrongLetters from './Components/WrongLetters';
import Figure from './Components/Figure';
import Header from './Components/Header';
import Popup from './Components/Popup';
import Word from './Components/Word';
import Notification from './Components/Notification';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));

export const App = () => {

    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const { key, keyCode } = e;
            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase();
                if(selectedWord.indexOf(letter) !== -1 && correctLetters.indexOf(letter) === -1) {
                    setCorrectLetters(currentLetters => [...currentLetters, letter]);
                }
                else {
                    if (wrongLetters.indexOf(letter) === -1) {
                        if(correctLetters.indexOf(letter) === -1){
                            setWrongLetters(currentLetters => [...currentLetters, letter]);
                        }
                        else{
                            showNotification(setNotification);
                        }
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playable, correctLetters, wrongLetters]);

    const handlePlayAgain = (e) => {
        e.preventDefault();
        setCorrectLetters([]);
        setWrongLetters([]);
        setPlayable(true);
        const random = Math.floor(Math.random() * words.length);
        selectedWord = words[random];
    };

    const showNotification = (setter) => {
        setter(true);
        setTimeout(() => {
            setter(false);
        }, 2000);
    };

    return (
        <div>
            <Header/>
            <WrongLetters
                alphabet={alphabet}
                wrongLetters={wrongLetters}
            />
            <Figure
                errors={wrongLetters.length}
            />
            <Word
                selectedWord={selectedWord}
                correctLetters={correctLetters}
            />
            <Popup
                setPlayable={setPlayable}
                wrongLetters={wrongLetters}
                selectedWord={selectedWord}
                correctLetters={correctLetters}
                handlePlayAgain={handlePlayAgain}
            />
            <Notification
                notification={notification}
            />
        </div>
    );
};
