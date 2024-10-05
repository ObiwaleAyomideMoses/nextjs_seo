'use client';
import React, { useEffect, useState } from 'react';
import './Stakinglido.css';
import { useTSConnect } from '@/src/context/ConnectContextProvider';
import { getUsdcBalance } from '@/src/utils/helper';
import { getTransaction } from '@/src/services';

export default function Stake() {
  const [stakingAmount, setStakingAmount] = useState<string>('');
  const { address } = useTSConnect();
  const [balance, setBalance] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const APR = 3.1;
  const { setShowApproveModal, setStakeResponse, subId, setAmount } =
    useTSConnect();

  const [showToast, setShowToast] = useState(false);

  const pubAddress = address.toString();
  const handleAddFundsClick = () => {
    // Copy public address to clipboard
    navigator.clipboard.writeText(pubAddress);
    // Show toast message
    setShowToast(true);
    window.open('https://faucet.circle.com/', '_blank');
    // Hide the toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    if (address) {
      getUsdcBalance(address)
        .then((bal) => {
          setBalance(bal);
        })
        .catch((error) => {
          console.error('Error fetching balance:', error);
        });
    }
  }, [address]);

  const stakeUSDC = () => {
    setIsLoading(true);
    getTransaction(Number(stakingAmount), subId)
      .then((res) => {
        setStakeResponse(res.data);
        setShowApproveModal(true);
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (stakingAmount) {
      const amount = parseFloat(stakingAmount);
      if (isNaN(amount)) {
        setErrorMessage('Please enter a valid number.');
      } else if (amount > balance) {
        setErrorMessage('You don’t have sufficient amount to stake.');
      } else if (amount < 2) {
        setErrorMessage('Minimum staking amount is 5 USDC.');
      } else {
        setErrorMessage(null);
      }
    } else {
      setErrorMessage(null);
    }
  }, [stakingAmount, balance]);

  const estimatedYield = stakingAmount
    ? (parseFloat(stakingAmount) * (APR / 100)).toFixed(2)
    : '0';
  return (
    <div className="modal-overlay">
      <div className="modal-heade">
        <h2>Stake USDC</h2>
        <p>Stake USDC and receive stETH while staking</p>
      </div>

      <div className="staking-box">
        <h3>Staking amount</h3>
        <div className="input-container">
          <input
            type="number"
            placeholder="Minimum 5 USDC"
            value={stakingAmount}
            onChange={(e) => {
              setStakingAmount(e.target.value);
              setAmount(Number(e.target.value));
            }}
            min="0"
            step="any"
          />
          <img
            className="usdc-logo"
            src="https://cryptach.org/crypto-logo/usd-coin-usdc-logo.svg"
            alt="USDC logo"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="balance-info">
          <span>
            Balance {balance}{' '}
            <img
              className="usdc-logo"
              src="https://cryptach.org/crypto-logo/usd-coin-usdc-logo.svg"
              alt="USDC logo"
            />{' '}
            USDC
          </span>
          <span
            className="add-funds"
            onClick={handleAddFundsClick}
            style={{ cursor: 'pointer', color: '#007bff' }}
          >
            + Add funds
          </span>
        </div>
        <div className="staking-details">
          <div className="lido-apr">
            <span>Estimated Yield</span>
            <span className="estimated-yield">
              {APR}% x {stakingAmount || '0'} = {estimatedYield} USDC
            </span>
          </div>
          <div className="lido-apr">
            <span>Lido APR</span>
            <span>{APR}%</span>
          </div>

          <div className="staking-period">
            <span>Staking period</span>
            <span>30 days</span>
          </div>
        </div>
        {/* Toast message */}
        {showToast && (
          <div className="toast-notification">
            Public address copied. Paste to fund your account.
          </div>
        )}
        <button
          className={`stake-button ${isLoading ? 'loading' : ''}`}
          onClick={stakeUSDC}
          disabled={
            // parseFloat(stakingAmount) > balance ||
            isLoading || !stakingAmount
          }
        >
          {isLoading ? 'Loading...' : 'Stake'}
        </button>
      </div>
    </div>
  );
}
