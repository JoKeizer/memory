import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import './Board.css';

export default function Board ({cards, flipped, handleClick, dimension, disabled, solved}) {
    const totalCards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', "19", "20", "21",  '22', '23', '24', '25', '26', '27', '28', '29', "30", "31", "32", '33', "34", "35", "36"];

    return (
        <div className={"board"}>
            {
                cards.map((card, index) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        type={card.type}
                        width={dimension / 6}
                        height={dimension / 6}
                        flipped={flipped.includes(card.id)}
                        handleClick = {handleClick}
                        disabled={disabled || solved.includes(card.id)}
                        solved={solved.includes(card.id)}
                        number={totalCards[index]}

                    />
            ))}
        </div>
    )
}

Board.propTypes = {
    disabled: PropTypes.bool.isRequired,
    dimension: PropTypes.number.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    solved: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleClick: PropTypes.func.isRequired
}
