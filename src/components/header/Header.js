import React, {useState} from 'react';
import './Header.css'

function Header ({title}) {

    return (
        <header >
            <span className="icon"></span>
            <h1>{title}</h1>
        </header>
    );
}

export default Header


