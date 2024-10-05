import './transactionauth.css';
import React, { useEffect, useState } from 'react';
import ModalHeader from './modalHeader';
import ConnectionRequest from './request';
import { useRouter } from 'next/navigation';
import DAppFlowBox from './DappFlowBox';
import NetworkInfo from './nerworkinfo';
import Footer from './footer';
import { useTSConnect } from '@/src/context/ConnectContextProvider';
// import { useNavigate } from 'react-router-dom';
import { makeTransaction } from '../../../services';
import { serverEndpoint } from '../../../constants';
import InitialModal from '../../popup/initialpopup';
import WarningModal from '../../popup/warningpopup';
import LidoLogo from '../../../assets/svg/ludomain.svg';
import ErrorModal from '../../popup/Errrormod';

interface TransactionModalProps {
  companylogo: string;
  companyname: string;
  companyurl: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  companyname,
  companyurl,
}) => {
  // const navigate = useNavigate();
  const [showInitialModal, setShowInitialModal] = useState(false); // Control modal visibility
  const [modalText, setModalText] = useState(''); // Control modal text
  const [progress, setProgress] = useState(0); // Track progress (0%, 33%, 66%, 100%)
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [transactionErrorMessage, setTransactionErrorMessage] = useState<
    string | null
  >(null);

  const router = useRouter();
  const {
    address,
    showApproveModal,
    setShowApproveModal,
    stakeRequest,
    setIsTransactionProcessing,
    isTransactionProcessing,
    subId,
    amount,
    setStakeBal,
  } = useTSConnect();

  const handleContinue = () => {
    // Show the initial modal before starting the transaction
    setShowInitialModal(true);
    setModalText('Initiating transaction...');
    setProgress(33); // Set initial progress to 33%

    setIsTransactionProcessing(true);

    makeTransaction(subId, amount)
      .then((res: any) => {
        if (res.statusCode === 201) {
          setStakeBal(res.data.stethBal);
          setShowApproveModal(false);
          router.push('/success');
          setIsTransactionProcessing(false);
          setShowInitialModal(false);
        } else {
          setIsTransactionProcessing(false);
          setShowInitialModal(false);
          setTransactionErrorMessage(res.message);
        }
      })
      .catch((err) => {
        setIsTransactionProcessing(false);
        setShowInitialModal(false);
        setTransactionErrorMessage(err.message);
        console.log(err);
      });
  };

  const handleCancel = () => {
    // Show warning modal instead of directly canceling
    setShowWarningModal(true);
    setTransactionErrorMessage(null);
  };

  const handleWarningBack = () => {
    // Close the warning modal and return to the transaction process
    setShowWarningModal(false);
  };

  const handleWarningCancelProcess = () => {
    // Handle the cancellation process, stop the transaction, and close all modals
    setShowWarningModal(false);
    setShowInitialModal(false);
    setIsTransactionProcessing(false);
    setShowApproveModal(false);
  };

  useEffect(() => {
    if (showApproveModal) {
      const es = new EventSource(
        `${serverEndpoint}/sse/application-progress?sub_id=${subId}`
      );

      es.onopen = () => {
        console.log('>>> Connection opened!');
      };

      es.onmessage = (event) => {
        console.log('Received event:', event.data);
        const data = JSON.parse(event.data);
        console.log('====== data ======');
        console.log(data);
        setProgress(
          Math.min(Math.ceil((data.step / data.total_length) * 100), 100)
        );

        setModalText(data.data);
      };

      return () => es.close();
    }
  }, [showApproveModal, subId]);

  return (
    <div className={`modal-overlay2 ${showApproveModal ? 'visible' : ''}`}>
      <div className="connect-container">
        <ModalHeader companylogo={LidoLogo} companyname={companyname} />
        <ConnectionRequest companyname={companyname} companyurl={companyurl} />
        <DAppFlowBox
          transactionDetails={{
            receivingAmount: stakeRequest?.layout.receive.to.title || '',
            receivingAsset: stakeRequest?.layout.swap.to.title || '',
            sendingAmount: stakeRequest?.layout.sending.to.title || '',
            sendingAsset: stakeRequest?.layout.sending.from.title || '',
            swapPlatform: stakeRequest?.layout.swap.through.title || '',
            stakePlatform: stakeRequest?.layout.stake.through.title || '',
            receivingStakeAsset: stakeRequest?.layout.stake.to.title || '',
            stakeInputAsset: stakeRequest?.layout.stake.to.title || '',
            stakeFromAsset: stakeRequest?.layout.stake.from.title || '',
            sendFromImageUri: stakeRequest?.layout.sending.from.img || '',
            swapFromImageUri: stakeRequest?.layout.swap.from.img || '',
            swapThroughImageUri: stakeRequest?.layout.swap.through.img || '',
            swapToImageUri: stakeRequest?.layout.swap.to.img || '',
            stakeFromImageUri: stakeRequest?.layout.stake.from.img || '',
            stakeThroughImageUri: stakeRequest?.layout.stake.through.img || '',
            stakeToImageUri: stakeRequest?.layout.stake.to.img || '',
            receiveImageUri: stakeRequest?.layout.receive.from.img || '',
          }}
          flow={'swap'}
        />

        {transactionErrorMessage ? (
          <ErrorModal message={transactionErrorMessage} />
        ) : (
          stakeRequest?.balanceError && (
            <ErrorModal message={stakeRequest?.balanceError} />
          )
        )}

        <NetworkInfo
          networkInfo={{
            fee: `${stakeRequest?.gasFee?.toFixed(4)} ETH`,
            network: 'Ethereum',
            address,
          }}
          companyurl={companyurl}
        />

        <Footer
          onContinue={handleContinue}
          onCancel={() => {
            setShowApproveModal(false);
          }}
          isLoading={false} // Disable loading in footer
        />

        <p className="agreement-text">
          By signing up, you agree to the{' '}
          <a href="#" className="link">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="link">
            Privacy Policy
          </a>
          .
        </p>

        {/* Show InitialModal based on state */}
        {showInitialModal && (
          <InitialModal
            onCancel={handleCancel}
            ontext={modalText}
            progress={progress} // Pass the progress to the modal
          />
        )}

        {/* Show WarningModal based on state */}
        {showWarningModal && (
          <WarningModal
            onCancelProcess={handleWarningCancelProcess}
            onBack={handleWarningBack}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionModal;
