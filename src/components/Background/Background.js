import React from 'react';
import './Background.css';

const Background = ({ url }) => {
  return (
    <div className="bg" style={{ backgroundImage: `url(${url})` }} />
  );
}

export default Background;