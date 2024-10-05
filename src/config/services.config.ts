import axios, { AxiosRequestConfig } from 'axios';
import { ServerResponse } from '../interface/wallet.interface';

export const createCall = async <T>(
  path: string,
  data: unknown = null,
  headers: Record<string, string> = {},
  method: 'GET' | 'POST' = 'POST'
): Promise<ServerResponse<T>> => {
  const serverEndpoint = 'https://action-link.townesquare.xyz/api';
  const url = `${serverEndpoint}${path}`;
  const axiosConfig: AxiosRequestConfig = {
    method,
    url,
    withCredentials: true,
    headers: {
      Accepts: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    if (method === 'GET') {
      const response = await axios(axiosConfig);
      return response?.data;
    } else {
      const response = await axios({ ...axiosConfig, data });

      return response.data;
    }
  } catch (error: any) {
    return {
      status: error.response?.data.status,
      message: error.response?.data.message,
    } as any;
  }
};
