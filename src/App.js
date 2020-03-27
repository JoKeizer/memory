import React, {useEffect, useState} from 'react';
import './App.css';
import Board from './components/board'

import initializeDeck from './deck'

export default function App() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dimension, setDimension] = useState(400);
    const [solved, setSolved] = useState([]);
    //can't click the board more than two
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        resizeBoard();
        setCards(initializeDeck());
    },[]);

    useEffect(() => {
        preloadImages();
    }, [cards])

    useEffect(() => {
        const resizeListener = window.addEventListener('resize', resizeBoard);

        return () => window.removeEventListener('resize', resizeListener)
    }, []);

    const handleClick = (id) => {
        setDisabled(true);
        if(flipped.length === 0) {
            setFlipped([id]);
            setDisabled(false);
        } else {
            if(sameCardClicked(id)) return
            setFlipped([flipped[0], id])

            if(isMatch(id)) {
                setSolved([...solved, flipped[0], id])
                resetCards()
            } else {
                setTimeout(resetCards, 2000)
            }
        }
    };

    const resetCards = () => {
        setFlipped([]);
        setDisabled(false)
    };

    const preloadImages = () => {
        cards.map(card => {
            const src = `/img/${card.type}.jpg`
            new Image().src = src

        })
    }

    //Check if the card have the same id
    const sameCardClicked = (id) => flipped.includes(id);

    const isMatch = (id) => {
        const clickedCard = cards.find((card) => card.id === id)
        const flippedCard = cards.find((card) => flipped[0] === card.id)
        return flippedCard.type === clickedCard.type

    }




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
            key={cards.id}
            cards={cards}
            flipped={flipped}
            handleClick={handleClick}
           disabled={disabled}
           solved={solved}
        />
    </div>
  );
}

