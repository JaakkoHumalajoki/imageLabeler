import React from 'react';
import './Footer.css';

const Footer = ({ photographer, photographer_url }) => {
    console.log(photographer_url);
    if (!photographer) {
        return (
            <footer>
                <p>
                    Background provided by <a href="https://www.pexels.com">Pexels</a>
                </p>
            </footer>
        );
    }
    return (
        <footer>
            <p>
                Background provided by <a href="https://www.pexels.com">Pexels</a>
                , photographer <a href={photographer_url}>{photographer}</a>
            </p>
        </footer>
    );
}

export default Footer;