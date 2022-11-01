import React from 'react';
import './Input.css';

const Input = ({ defaultValue, onInputChange, onButtonClick }) => {
    return (
        <div className="Input">
            <label htmlFor="input-url"> Enter image URL</label>
            <div className="row">
                <input 
                    id="input-url" 
                    type="url"
                    defaultValue={defaultValue}
                    onChange={onInputChange}
                />
                <button className="input-button" onClick={onButtonClick}>
                    Search
                </button>
            </div>
        </div>
    );
}

export default Input;