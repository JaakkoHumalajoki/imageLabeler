import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ image_url }) => {
    if (!image_url) return <></>;
    return (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img className="ImageDisplay" alt="your image" src={image_url} />
    );
}

export default ImageDisplay;