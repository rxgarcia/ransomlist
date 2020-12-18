import React from 'react';
import './navBar.css';

export class NavBar extends React.Component {
    render() {

        const pages = ['My Profile 🙈', 'My Ransoms 👀', 'My History 🏆'];
        const navLinks = pages.map(page => {
            return (
                <a href={"./" + page}>
                    {page}
                </a>
            )
        })
        return (
            <div className="header">
                <h1 className="title">
                    RansomList 😈
                </h1>
                <h1 className="navLinks">
                    {navLinks}
                </h1>
            </div>
        )
    }
}