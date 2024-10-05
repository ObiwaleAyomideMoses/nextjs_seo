'use client';
import './Tsconnect.css';
import { useTSConnect } from '@/src/context/ConnectContextProvider';
import ConnectGoogleButton from '@/src/components/Tsloginmodal/ConnectGoogleButton';
import TsConnectionRequest from '@/src/components/TsConnection/TsconnectionModal';
export default function ConnectModal() {
  let id = '12345';
  console.log();
  const { showConnectModal } = useTSConnect();
  return (
    <div className={`modal-overlay2 ${showConnectModal ? 'visible' : ''}`}>
      <div className="login-container">
        <p
          style={{
            fontSize: '29px',
            fontWeight: 500,
            lineHeight: '36.54px',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          Login or Sign up
        </p>

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

        {/* Email Login */}

        <ConnectGoogleButton
          title="Continue with Google"
          logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
          client_id={id as string}
        />

        <div className="terms">
          <p>
            By continuing, you agree to the{' '}
            <a
              href="https://townsquare.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>
          <p>
            Learn more about <a href="#">TowneSquare Connect Auth</a>.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p className="terms">Powered by </p>
          <img
            src="https://www.townesquare.xyz/assets/img/logo.svg"
            alt="Townesquare Logo"
            className="app-logo2"
          />
          <p
            style={{
              fontSize: '9px',
              fontWeight: '700',
            }}
          >
            townesquare
            <br />
            connect
          </p>
        </div>
      </div>
      <TsConnectionRequest />
    </div>
  );
}
