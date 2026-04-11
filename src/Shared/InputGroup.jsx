// src/components/Shared/InputGroup.jsx
import React from 'react';

const InputGroup = ({ icon, label, name, value, onChange, type, min, step, options, children }) => (
    <div className="ccc-input-group">
        <label htmlFor={name} className="ccc-label">{label}</label>
        <div className={`ccc-input-wrapper ${type !== 'select' ? 'ccc-input-line-wrapper' : ''}`}>
            {icon && <div className="ccc-input-icon">{icon}</div>}
            {type === 'select' ? (
                <select 
                    id={name} 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    className={`ccc-select ${icon ? 'ccc-select-icon-padding' : ''}`}
                >
                    {options ? options.map(opt => <option key={opt} value={opt}>{opt}</option>) : children}
                </select>
            ) : (
                <input 
                    type={type} 
                    id={name} 
                    name={name} 
                    min={min} 
                    step={step} 
                    value={value} 
                    onChange={onChange} 
                    className={`ccc-input-text ${icon ? 'ccc-input-icon-padding' : ''}`} 
                    placeholder="0"
                />
            )}
        </div>
    </div>
);

export default InputGroup;