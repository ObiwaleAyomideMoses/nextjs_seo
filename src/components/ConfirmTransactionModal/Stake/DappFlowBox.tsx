// DAppFlowBox.tsx
import React from 'react';
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
interface DAppFlowBoxProps {
  flow: 'swap' | 'stake' | 'custom';
  transactionDetails: {
    sendingAsset: string;
    sendingAmount: string;
    receivingAsset: string;
    receivingAmount: string;
    swapPlatform: string;
    stakePlatform: string;
    receivingStakeAsset: string;
    stakeInputAsset: string;
    stakeFromAsset: string;

    sendFromImageUri?: string;
    swapFromImageUri?: string;
    swapThroughImageUri?: string;
    swapToImageUri?: string;
    stakeFromImageUri?: string;
    stakeThroughImageUri?: string;
    stakeToImageUri?: string;
    receiveImageUri?: string;
  };
}

const DAppFlowBox: React.FC<DAppFlowBoxProps> = ({
  // flow,
  transactionDetails,
}) => (
  <div className="flow-boxmain">
    <div className="flow-box">
      <div className="flow-text">You are sending</div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.sendFromImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.sendingAsset}
          </p>
        </div>

        <div
          style={{
            fontSize: '14px',
            color: '#bbb',
            textAlign: 'start',
          }}
        >
          - {transactionDetails.sendingAmount}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', margin: '10px 2px', width: '100%' }}>
      <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#404040' }} />
    </div>

    {/* {flow === 'swap' && ( */}
    <>
      <div className="flow-text">Swap</div>
      <div className="flow-row">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.swapFromImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.sendingAsset}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ArrowRight />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.swapThroughImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.swapPlatform}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ArrowRight />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.swapToImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.receivingAsset}
          </p>
        </div>
      </div>
    </>
    {/* )} */}

    <>
      <div className="flow-text">Stake</div>
      <div className="flow-row">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.stakeFromImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.stakeFromAsset}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ArrowRight />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.stakeThroughImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.stakePlatform}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ArrowRight />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.stakeToImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.receivingStakeAsset}
          </p>
        </div>
      </div>
    </>
    <div className="flow-box">
      <div className="flow-text">You will receive</div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            className="usdc-logo"
            src={transactionDetails.receiveImageUri}
            alt="USDC logo"
          />
          <p
            style={{
              fontSize: '14px',
              color: '#bbb',
              textAlign: 'start',
            }}
          >
            {transactionDetails.receivingStakeAsset}
          </p>
        </div>

        <div
          style={{
            fontSize: '14px',
            color: '#bbb',
            textAlign: 'start',
          }}
        >
          + {transactionDetails.receivingAmount}
        </div>
      </div>
    </div>
  </div>
);

export default DAppFlowBox;
