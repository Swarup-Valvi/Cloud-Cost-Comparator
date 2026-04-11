// src/components/Shared/InputToggle.jsx
import React from 'react';

const InputToggle = ({ label, name, checked, onChange }) => (
    <div className="ccc-toggle-group">
        <label htmlFor={name} className="ccc-label-toggle">{label}</label>
        <label htmlFor={name} className="ccc-toggle-container">
            <input type="checkbox" id={name} name={name} checked={checked} onChange={onChange} className="ccc-toggle-checkbox-sr" />
            <div className="ccc-toggle-slider"></div>
        </label>
    </div>
);

export default InputToggle;