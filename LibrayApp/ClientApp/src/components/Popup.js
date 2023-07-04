import React, { ReactComponentElement } from 'react';
import AddAuthorForm from './AddAuthorForm';

import '../assets/Popup.css';

function Popup({ SomeComponent, onClose }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <SomeComponent onClose={onClose}/>
            </div>
        </div>
    );
}

export default Popup;