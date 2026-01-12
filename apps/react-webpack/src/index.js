import React from 'react';
import ReactDOMClient from 'react-dom/client';

const root = document.getElementById('root');
const rootElement = ReactDOMClient.createRoot(root);

const elements = (
    <div className="container">
        <h1>Hello, React!!</h1>
        <p>this is React sample application</p>
    </div>
);

rootElement.render(elements);