// src/components/Spinner-loader.tsx
import React from 'react';
import './Spinner.css'; // Import the CSS file for animations

const Spinner: React.FC = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <div className="dot bg-yellow-400"></div>
                <div className="dot bg-green-400"></div>
                <div className="dot bg-pink-400"></div>
                <div className="dot bg-blue-400"></div>
                <div className="dot bg-purple-400"></div>
                <div className="dot bg-orange-400"></div>
                <div className="dot bg-purple-600"></div>
            </div>
        </div>
    );
};

export default Spinner;
