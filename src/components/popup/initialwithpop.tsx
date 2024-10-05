import React, { useState } from 'react';
import '../Withdrawal/Withdrawal.css'
import { useTSConnect } from '../Tsloginmodal/context/ConnectContextProvider';

const InitialWithdrawPopup: React.FC = (): JSX.Element => {
  const [amount, setAmount] = useState<string>('');
  const isDisabled = amount === '';
  const { stakeBal } = useTSConnect();

  return (
    <div className="modal-overlay">
      <div className="modal-header">
        <p>Withdraw USDC</p>
        <p>Request stETH/wstETH withdrawal and claim ETH</p>
      </div>

      <div className="container">
        <div className="inputContainer">
          <label className="label">Withdrawal Amount</label>
          <div className="inputWrapper">
            <input
              className="input"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="asset">
              <img
                src="https://cryptach.org/crypto-logo/usd-coin-usdc-logo.svg"
                alt="stETH"
                className="assetIcon"
              />
              stETH
            </div>
          </div>
          <div className="balance">
            stETH balance
            <img
              src="https://cryptach.org/crypto-logo/usd-coin-usdc-logo.svg"
              alt="stETH"
              className="assetIcon"
            />
             {stakeBal.toFixed(4)} stETH
          </div>
        </div>

        <div className="optionsContainer">
          <div className="option">
            <div className="optionLabel">Use Lido</div>
            <div className="optionDetails">
              <span>Rate: 1:1</span>
              <span>Waiting time ~6 days</span>
            </div>
          </div>
          <div className="option">
            <div className="optionLabel">Use DEX</div>
            <div className="optionDetails">
              <span>Rate: 1:0.997</span>
              <span>Waiting time: ~1-5 min</span>
            </div>
          </div>
        </div>

        <button
          className="withdrawButton"
          disabled={isDisabled}
        >
          Request withdrawal
        </button>
      </div>
    </div>
  );
};

export default InitialWithdrawPopup;
