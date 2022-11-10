import React from 'react';
import { LogonData } from './LogonData/LogonData';

export const TopMenu = () => {
    return (
        <nav className='navigation__bar'>
            <ul className='top__menu'>
                <li className='menu__element'><span data-content="Strona Główna" className='fancy__text'>Strona Główna</span></li>
                <li className='menu__element'><span data-content="Kategorie" className='fancy__text'>Kategorie</span></li>
                <li className='menu__element'>Newsy</li>
                <li className='menu__element'>O Geek Utopii</li>
            </ul>
            <LogonData />
        </nav>
    )
}