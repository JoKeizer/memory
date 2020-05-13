import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import Board from './components/board/Board'
import Header from './components/header/Header';
import Score from './components/score/Score';
import Timer from './components/timer/Timer';

import initializeDeck from './deck'

export default function App() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dimension, setDimension] = useState(400);
    const [solved, setSolved] = useState([]);
    const [scoreCount, setScore] = useState(0);
    //can't click the board more than two
    const [disabled, setDisabled] = useState(false);
    //End Game
    const [finished, setFinished] = useState(false);
    const totalCards = cards.length / 2;
    const [totalMatches, setTotalMatch] = useState(totalCards)

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


    const resetGame= () => {
        console.log("resetGame running")
        setFinished(false);
        setScore(0);
        setCards(initializeDeck());
        preloadImages()

    }

    const handleClick = (id) => {
        setDisabled(true);
        if(flipped.length === 0) {
            setFlipped([id]);
            setDisabled(false);
        } else {
            if(sameCardClicked(id)) return;
            setFlipped([flipped[0], id]);

            if(isMatch(id)) {
                setSolved([...solved, flipped[0], id])
                setScore(scoreCount + 20);
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
            const src = `/img/${card.type}.png`
            new Image().src = src
        })
    };

    //Check if the card have the same id
    const sameCardClicked = (id) => flipped.includes(id);

    const isMatch = (id) => {
        const clickedCard = cards.find((card) => card.id === id);
        const flippedCard = cards.find((card) => flipped[0] === card.id);

        if(solved.length === totalCards) {
            finishedGame();
        }

        return flippedCard.type === clickedCard.type;

    };


    const resizeBoard = () => {
        setDimension(Math.min(
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
        ))
    };

    const finishedGame = () => {
        setFinished(true);
    }

  return (
    <Fragment>
        {finished ? (<Fragment>
            <div className="container">
                <Header title="Results"/>
                <div className="game-container">
                    <p className="total-score">Total score: {scoreCount}</p>
                    <button className="btn" onClick={() => resetGame()} >Play again</button>

                </div>
            </div>
        </Fragment>) : (<Fragment>
            <div className="container">
                <Header title="Memory"/>
                <div className="game-container">
                    <Timer seconds={190} endGame={finished} />
                    <Board dimension={dimension}
                           key={cards.id}
                           cards={cards}
                           flipped={flipped}
                           handleClick={handleClick}
                           disabled={disabled}
                           solved={solved}
                    />
                    <Score totalPoints={scoreCount}/>

                </div>
            </div>
        </Fragment>)}

    </Fragment>
  );
}

