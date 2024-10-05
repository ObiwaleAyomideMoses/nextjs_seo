import React from 'react';

interface ErrorModalProps {
  message: string;
  onClose?: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div
      style={{
        width: '400px',
        height: 'auto',
        backgroundColor: '#F471',
        borderRadius: '8px',
        padding: '16px', 
        color: '#fff',
        position: 'relative',
        border: '1px solid #FF4471',
        cursor: 'pointer',
        display: 'flex',
        margin:'0px',
        flexDirection: 'column',
      }}
      onClick={onClose}
    >
      <p style={{ fontSize: '13px', color: '#FF447F', margin: 0 }}>ERROR</p> 
      <div style={{ marginTop: '8px' }}> 
        <p style={{ margin: 0  , color: '#cccccc',}}>{message}  <a
          href="https://cloud.google.com/application/web3/faucet/ethereum"
          style={{ color: '#8c7df0', textDecoration: 'underline', marginTop: '4px' }}
        >
          Get ETH
        </a></p>
       
      </div>
    </div>
  );
};

export default ErrorModal;
