// ConnectionRequest.tsx
import React from 'react';
import './transactionauth.css';
import LidoLogo from '../../../assets/svg/ludomain.svg';

interface ConnectionRequestProps {
  companyname: string;
  companyurl: string;
}

const ConnectionRequest: React.FC<ConnectionRequestProps> = ({
  companyname,
  companyurl,
}) => (
  <div className="connection-request">
    <h2 className="request-text">Signature request</h2>
    <LidoLogo />
    <h3 className="app-name">{companyname}</h3>
    <p>{companyurl}</p>
  </div>
);

export default ConnectionRequest;
