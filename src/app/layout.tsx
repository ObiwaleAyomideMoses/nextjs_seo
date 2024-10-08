import TSConnectProvider from '../context/ConnectContextProvider';
import TsConnectionRequest from '../components/TsConnection/TsconnectionModal';
import ConfirmStakeModal from '../components/ConfirmTransactionModal/Stake/ConfirmStakeModal';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TSConnectProvider>
          {children}
          <TsConnectionRequest />
          <ConfirmStakeModal />
        </TSConnectProvider>
      </body>
    </html>
  );
}
