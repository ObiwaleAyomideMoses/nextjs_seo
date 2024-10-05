import { createCall } from '../config/services.config';
import { StakeRequest } from '../interface/wallet.interface';

export const getWallet = async (sub: string) => {
  return createCall<{ wallet_address: string; is_active: boolean }>(
    `/users`,
    {
      sub,
    },
    {},
    'POST'
  );
};

export const getTransaction = async (inputAmount: number, subId: string) => {
  return createCall<StakeRequest>(
    `/transactions/process-eth-eqv?amount=${inputAmount}&sub=${subId}`,
    {},
    {},
    'GET'
  );
};

export const makeTransaction = async (sub: string, amount: number) => {
  return createCall('/transactions', { sub, amount }, {}, 'POST');
};
