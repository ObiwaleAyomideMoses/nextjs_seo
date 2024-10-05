// ModalHeader.tsx
import React from 'react';
import './transactionauth.css';

interface ModalHeaderProps {
  companylogo: string;
  companyname: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  companylogo,
  companyname,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img
      src="https://www.townesquare.xyz/assets/img/logo.svg"
      alt="Townesquare Logo"
      className="app-logo"
    />
    <p
      style={{
        fontSize: '18px',
        fontWeight: '700',
        lineHeight: '22px',
        paddingLeft: 2,
      }}
    >
      townesquare
      <br />
      connect
    </p>
  </div>
);

export default ModalHeader;
