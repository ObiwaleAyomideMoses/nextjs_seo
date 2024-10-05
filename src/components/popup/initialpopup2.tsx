import React, { useState } from 'react';
import { useTSConnect } from '../Tsloginmodal/context/ConnectContextProvider';

interface InitialWITModalProps {
  onCancel?: () => void;
}

const InitialWITModal: React.FC<InitialWITModalProps> = ({ onCancel }) => {
  const [amount, setAmount] = useState<string>('');
  const isDisabled = amount === '';
  const { stakeBal } = useTSConnect();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#222222',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      flexDirection: 'column'
    }}>
      <div style={{
        color: 'white',
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <p>Withdraw USDC</p>
        <p>Request stETH/wstETH withdrawal and claim ETH</p>
      </div>

      <div style={{
        backgroundColor: '#262931',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 4px 10px rgba(11, 11, 11, 0.2)',
        color: 'white'
      }}>
        <div style={{ marginBottom: '20px', marginTop: '16px' }}>
          <label style={{ fontSize: '14px', marginBottom: '10px', display: 'block' }}>Withdrawal Amount</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #5c6c78',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: '#3b4955'
          }}>
            <input
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                outline: 'none',
                fontSize: '14px'
              }}
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#6da5ff'
            }}>
              <img
                src="https://cryptach.org/crypto-logo/usd-coin-usdc-logo.svg"
                alt="stETH"
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '8px'
                }}
              />
              stETH
            </div>
          </div>
          <div style={{
            marginTop: '10px',
            fontSize: '12px',
            color: '#a1a1a1'
          }}>
            stETH balance
            <img
              src="https://cryptach.org/crypto-logo/usd-coin-usdc-logo.svg"
              alt="stETH"
              style={{
                width: '20px',
                height: '20px',
                marginLeft: '8px'
              }}
            />
           {stakeBal.toFixed(4)} stETH
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{
            border: '1px solid #5c6c78',
            borderRadius: '8px',
            padding: '10px',
            width: '48%',
            backgroundColor: '#3b4955',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              marginBottom: '12px'
            }}>Use Lido</div>
            <div style={{
              fontSize: '12px',
              color: '#a1a1a1'
            }}>
              <span>Rate: 1:1</span>
              <span>Waiting time ~6 days</span>
            </div>
          </div>
          <div style={{
            border: '1px solid #5c6c78',
            borderRadius: '8px',
            padding: '10px',
            width: '48%',
            backgroundColor: '#3b4955',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              marginBottom: '12px'
            }}>Use DEX</div>
            <div style={{
              fontSize: '12px',
              color: '#a1a1a1'
            }}>
              <span>Rate: 1:0.997</span>
              <span>Waiting time: ~1-5 min</span>
            </div>
          </div>
        </div>

        <button
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: isDisabled ? '#5c6c78' : '#437dd1',
            borderRadius: '8px',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            marginBottom: '16px'
          }}
          disabled={isDisabled}
        >
          Request withdrawal
        </button>
      </div>
    </div>
  );
};

export default InitialWITModal;
