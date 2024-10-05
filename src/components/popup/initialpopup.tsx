import React from 'react';
import './initialpopup.css';

interface InitialModalProps {
  onCancel: () => void;
  ontext: string;
  progress: number; // New prop to handle progress
}

const InitialModal: React.FC<InitialModalProps> = ({ onCancel, ontext, progress }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-text">{ontext}</p> 
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InitialModal;
