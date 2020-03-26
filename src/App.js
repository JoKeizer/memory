import React, {useEffect, useState} from 'react';
import './App.css';
import Board from './components/board'

import initializeDeck from './deck'

export default function App() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dimension, setDimension] = useState(400);


    const handleClick = (id) => {
        setFlipped([...flipped, id])
    };

    useEffect(() => {
        resizeBoard()
        setCards(initializeDeck())
    },[]);

    useEffect(() => {
        const resizeListener = window.addEventListener('resize', resizeBoard);

        return () => window.removeEventListener('resize', resizeListener)
    }, []);


    const resizeBoard = () => {
        setDimension(Math.min(
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
        ))
    }

  return (
    <div className="App">
      <h1>Memory</h1>
        <Board dimension={dimension}
            cards={cards}
            flipped={flipped}
            handleClick={handleClick}
        />
    </div>
  );
}

