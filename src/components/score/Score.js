import React, {useState, Fragment} from 'react';

import './Score.css';

function Score ({totalPoints}) {
    return (
        <Fragment>
            <p className="points">Totaal: {totalPoints} punten</p>
        </Fragment>
    );
}

export default Score


