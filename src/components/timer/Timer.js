import React, {Fragment, useEffect, useState} from 'react';
import './Timer.css'

function Timer ({seconds}) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [updateMinutes, setMinutes] = useState(Math.floor(timeLeft / 60));
    const [updateSeconds, setSeconds] = useState(Math.floor(timeLeft % 60));

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setMinutes(Math.floor(timeLeft / 60)) ;
            setSeconds(Math.floor(timeLeft % 60));
            setTimeLeft(timeLeft - 1);

        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);


    return (
        <Fragment >
            <div className="timer">
                <h1>{updateMinutes}:{updateSeconds}</h1>

            </div>
        </Fragment>
    );
}

export default Timer
