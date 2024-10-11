import './Tsconnect.css';
import ConnectModal from '@/src/components/TsConnection/ConnectModal';
import axios from 'axios';
interface Params {
  protocol: string;
  pair: string;
  id: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  console.log('params', params);
  let clientInfo = {
    name: 'Default Title',
    description: 'Default Description',
    image: 'default-image-eurl',
  };

  try {
    const client_data = await axios.get(
      'https://d7jxq5gn-3001.euw.devtunnels.ms/wallets/clientInfo'
    );
    // const response = await fetch(
    //   `https://d7jxq5gn-3001.euw.devtunnels.ms/wallets/clientInfo`
    // );

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    console.log(client_data.data);

    clientInfo = client_data.data;
  } catch (error) {
    console.error('Failed to fetch client info:', error);
  }

  return {
    title: clientInfo.name || 'Default Title',
    description: clientInfo.description || 'Default Description',
    openGraph: {
      title: clientInfo.name || 'Default Title',
      description: clientInfo.description || 'Default Description',
      images: [
        {
          url: clientInfo.image || 'default-image-url',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: clientInfo.name || 'Default Title',
      description: clientInfo.description || 'Default Description',
      image: clientInfo.image || 'default-image-url',
    },
  };
}
export default function ConnectWallet() {
  return <ConnectModal />;
}
