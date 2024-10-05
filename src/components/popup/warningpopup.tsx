import React from 'react';
import './warningpopup.css';

interface WarningModalProps {
  onCancelProcess: () => void;
  onBack: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ onCancelProcess, onBack }) => {
  return (
    <div className="modal-overlay-warning">
      <div className="modal-content-warning">
        <div className="modal-header">
          <p className="modal-title">Warning</p>
          <button className="close-button" onClick={onBack}>X</button>
        </div>
        <p className="modal-warning-text">
          If you cancel the process now, your transactions may remain incomplete, and we cannot guarantee the safe return or proper handling of your crypto assets.
        </p>
        <p className="modal-risk-text">You are proceeding at your own risk.</p>
        <div className="modal-buttons">
          <p className="back-button" onClick={onBack}>
            Back
          </p>
          <p className="cancel-process-button" onClick={onCancelProcess}>
            Cancel process
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
