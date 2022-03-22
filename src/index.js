import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

import './styles/style.css';
import './styles/sass.sass';

const x = () => {
        console.log(`xxx`);
};

x();

var x2 = 10;

async function test() {
        return await Promise.resolve('test async await');
}

test().then(console.log);

class Utill {
        static id = Date.now();
}

console.log(Utill.id);

const app = (
    <App />
);

render(app, document.getElementById('root'));
