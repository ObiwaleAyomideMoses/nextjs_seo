export interface ServerResponse<T> {
  data: T;
  statusCode: number;
  error?: string;
  message: string;
}

export interface StakeRequest {
  ethEqv: number;
  layout: {
    sending: {
      from: CoinAsset;
      to: CoinAsset;
    };
    swap: {
      from: CoinAsset;
      through: CoinAsset;
      to: CoinAsset;
    };
    stake: {
      from: CoinAsset;
      through: CoinAsset;
      to: CoinAsset;
    };
    receive: {
      from: CoinAsset;
      to: CoinAsset;
    };
  };
  gasFee: number;
  balanceError: string | null;
}
export interface CoinAsset {
  title: string;
  img: string;
}
