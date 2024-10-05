'use client';
import React, { ReactNode, useEffect, useState, createContext } from 'react';
import { validateIDToken } from '../utils/helper';
import { getWallet } from '../services';
import { StakeRequest } from '../interface/wallet.interface';

const generateNonce = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
const handleGoogleLogin = (service_id: string) => {
  const oAuthClientId =
    '35070374945-kjvu0tbjpc9ov7ekbl705fuks91535go.apps.googleusercontent.com';
  const callbackUrl = `https://action-link.townesquare.xyz/api/google-redirect`;
  const googleClientId = oAuthClientId;
  const GOOGLE_OAUTH_SCOPES = [
    'https%3A//www.googleapis.com/auth/userinfo.email',
    'https%3A//www.googleapis.com/auth/userinfo.profile',
  ];
  const scopes = GOOGLE_OAUTH_SCOPES.join(' ');
  const nonce = generateNonce(); // Generate a random nonce
  const state = JSON.stringify({
    service_id,
    nonce,
    environment: process.env.NODE_ENV,
  }); // Include nonce in state
  const targetUrl = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  window.location.href = targetUrl;
};

const extractTokenFromUrl = async (
  setAddress: (address: string) => void,
  setConnected: (connected: boolean) => void,
  setShowConnectModal: (value: boolean) => void,
  setShowConnectRequestModal: (value: boolean) => void,
  setIsFetchingWallet: (isLoadingAddress: boolean) => void,
  setSubId: (subId: string) => void
) => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  let idToken = params.get('id_token');
  // Check if the idToken contains '?redirected=true' and remove it
  if (idToken && idToken.includes('?redirected=true')) {
    idToken = idToken.split('?redirected=true')[0];
  }
  if (idToken) {
    const payload = await validateIDToken(idToken);
    if (payload && payload.sub) {
      const { sub } = payload;
      console.log(sub);
      setIsFetchingWallet(true);
      const wallet = await getWallet(sub);
      setIsFetchingWallet(false);
      if (wallet.statusCode == 201 && wallet.data.wallet_address) {
        setSubId(sub);
        setAddress(wallet.data.wallet_address);
        setShowConnectModal(false);
        setShowConnectRequestModal(true);
      }
    }
  }
  // Clear the hash parameters from the URL
  window.history.replaceState(null, '', window.location.pathname);
};

type ConnectContextProps = {
  children: ReactNode;
};

export type ConnectContextType = {
  address: string;
  setAddress: (address: string) => void;
  connected: boolean;
  setConnected: (connected: boolean) => void;
  connect: (provider: 'google', client_id: string) => void;
  disconnect: () => void;
  showConnectModal: boolean;
  setShowConnectModal: (showConnectModal: boolean) => void;
  showConnectRequestModal: boolean;
  setShowConnectRequestModal: (showConnectRequestModal: boolean) => void;
  showApproveModal: boolean;
  setShowApproveModal: (showApproveModal: boolean) => void;
  isFetchingWallet: boolean;
  setIsFetchingWallet: (isLoadingAddress: boolean) => void;
  stakeRequest: StakeRequest | null;
  setStakeResponse: (stakeInfo: StakeRequest) => void;
  isTransactionProcessing: boolean;
  setIsTransactionProcessing: (state: boolean) => void;
  amount: number;
  setAmount: (amount: number) => void;
  subId: string;
  setSubId: (subId: string) => void;
  setStakeBal: (bal: number) => void;
  stakeBal: number;
};

export const ConnectContext = createContext<ConnectContextType>({
  address: '',
  setAddress: () => {},
  connected: false,
  setConnected: () => {},
  connect: () => {},
  disconnect: () => {},
  showConnectModal: false,
  setShowConnectModal: () => {},
  showConnectRequestModal: false,
  setShowConnectRequestModal: () => {},
  showApproveModal: false,
  setShowApproveModal: () => {},
  isFetchingWallet: false,
  setIsFetchingWallet: () => {},
  stakeRequest: null,
  setStakeResponse: () => {},
  isTransactionProcessing: false,
  setIsTransactionProcessing: () => false,
  amount: 0,
  setAmount: () => {},
  subId: '',
  setSubId: () => {},
  setStakeBal: () => {},
  stakeBal: 0,
});

const TSConnectProvider: React.FC<ConnectContextProps> = ({ children }) => {
  const [address, setAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(true);
  const [showConnectRequestModal, setShowConnectRequestModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [isFetchingWallet, setIsFetchingWallet] = useState(false);
  const [isTransactionProcessing, setIsTransactionProcessing] = useState(false);
  const [stakeRequest, setStakeResponse] = useState<null | StakeRequest>(null);
  const [amount, setAmount] = useState(0);
  const [subId, setSubId] = useState('');
  const [stakeBal, setStakeBal] = useState(0);

  useEffect(() => {
    extractTokenFromUrl(
      setAddress,
      setConnected,
      setShowConnectModal,
      setShowConnectRequestModal,
      setIsFetchingWallet,
      setSubId
    );
  }, []);

  const contextValue: ConnectContextType = {
    address,
    setAddress,
    connected,
    setConnected,
    isFetchingWallet,
    setIsFetchingWallet,
    connect(provider, client_id) {
      handleGoogleLogin(client_id);
    },
    disconnect() {
      setAddress('');
      setConnected(false);
    },
    showConnectModal,
    setShowConnectModal,
    showConnectRequestModal,
    setShowConnectRequestModal,
    showApproveModal,
    setShowApproveModal,
    isTransactionProcessing,
    setIsTransactionProcessing,
    stakeRequest,
    setStakeResponse,

    amount,
    setAmount,
    subId,
    setSubId,
    setStakeBal,
    stakeBal,
  };

  return (
    <ConnectContext.Provider value={contextValue}>
      {children}
    </ConnectContext.Provider>
  );
};

export default TSConnectProvider;

export const useTSConnect = () => React.useContext(ConnectContext);
