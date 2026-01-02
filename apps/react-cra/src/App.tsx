import React from 'react';
import logo from './logo.svg';
import './App.css';

const title = "React page.";
const message = "メッセージを表示します";

function Msg(){
  return <p className='msg'>Hello!!</p>
}

function App() {
  return (
    <div className='container'>
      <h1>{title}</h1>
      <h2>{message}</h2>
      <Msg />
      <Msg />
      <Msg />
    </div>
  );
}

export default App;
