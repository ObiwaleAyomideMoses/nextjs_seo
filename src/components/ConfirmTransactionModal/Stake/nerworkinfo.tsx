import React from 'react';
import './transactionauth.css';

interface NetworkInfoProps {
  networkInfo: {
    fee: string;
    network: string;
    address: string;
  };
  companyurl: string;
}

const NetworkInfo: React.FC<NetworkInfoProps> = ({
  networkInfo,
  companyurl,
}) => (
  <div className="network-info">
    <div className="flow-row">
      <div className="flow-text">Network fee:</div>
      <div className="flow-text">{networkInfo.fee}</div>
    </div>
    <div className="flow-row">
      <div className="flow-text">Address used:</div>
      <div className="flow-text">{networkInfo.address}</div>
    </div>
    <p>
      View account at{' '}
      <a href={companyurl} className="link">
        lido.io
      </a>
    </p>
    <div className="flow-row">
      <div className="flow-text">Network:</div>
      <div className="flow-text">{networkInfo.network}</div>
    </div>
  </div>
);

export default NetworkInfo;
