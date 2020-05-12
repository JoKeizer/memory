import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card({
    handleClick,
    id,
    type,
    flipped,
    height,
    width,
    disabled,
    solved,
    number
}) {


    return <div
        className={`flip-container ${flipped ? 'flipped': ''}`}
        style={{width, height}}
        onClick={ () => disabled ? null : handleClick(id) }
        >
        <div className="flipper">
            <img
                style={{height, width}}
                className={flipped ? 'front' : 'back'}
                src={flipped || solved ? `/img/${type}.png` : `/img/back/back.png`}
            />
            {/*{flipped || solved ? null : <span className="number">{number}</span>}*/}
            {flipped || solved ? null :
                <Fragment>
                    {number > 9 ? <span className="high-number">{number}</span> : <span className="number">{number}</span>}
                </Fragment>
            }





        </div>
    </div>
}

Card.propTypes = {
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    flipped: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired
};