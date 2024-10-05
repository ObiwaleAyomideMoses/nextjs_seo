'use client';
import React from 'react';
import TransactionModal from './MainTranComp';
// import { useNavigate } from 'react-router-dom';

const ConfirmStakeModal = () => {
  const handleContinue = () => {};

  return (
    <TransactionModal
      companylogo="https://www.townesquare.xyz/assets/img/logo.svg"
      companyname="Lido Dapp"
      companyurl="https://lido.io"
    />
  );
};

export default ConfirmStakeModal;
