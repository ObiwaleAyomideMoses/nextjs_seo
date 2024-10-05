import React from 'react';
import './transactionauth.css';

interface FooterProps {
  onContinue: () => void;
  onCancel: () => void;
  isLoading: boolean; // Can remove this if not needed anymore
}

const Footer: React.FC<FooterProps> = ({ onContinue, onCancel }) => (
  <div className="footer">
    <button className="cancel-btn" onClick={onCancel}>
      Cancel
    </button>
    <button className="continue-button" onClick={onContinue}>
      Approve and Finish
    </button>
  </div>
);

export default Footer;
