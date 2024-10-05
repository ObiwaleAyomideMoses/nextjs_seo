import React, { useState } from 'react';
import './succesMod.css';


import InitialModal from '../popup/initialpopup';
import InitialWithdrawPopup from '../popup/initialwithpop';
import InitialWITModal from '../popup/initialpopup2';



interface SuccessModalProps {}

const SuccessModal: React.FC<SuccessModalProps> = () => {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  // const navigate = useNavigate(); 

  const handleClose = () => {
    
    setShowWithdrawalModal(true);
  };

  return (
    <div className="modal-overlay">
      {showWithdrawalModal ? (       
        <InitialWITModal/>
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/336/603/original/celebration-firework-explode-element-icon-design-png.png"
              alt="Celebration"
              className="celebration-image"
            />
            <h2 className="success-title">Stake Successful!</h2>
            <p className="success-text">
              Congratulations! Your ETH has been successfully staked.
            </p>
            <button onClick={handleClose} className="close-button">
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessModal;
