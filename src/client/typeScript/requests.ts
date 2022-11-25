import axios from 'axios';
import { GameOutcome, SpinParams } from '../../shared/GameOutcome';

const BASE_URL = 'http://localhost:3000/';

const gameRequests = axios.create({ baseURL: BASE_URL });

export const spinRequest = async (body: SpinParams): Promise<GameOutcome> => {
  try {
    const res = await gameRequests.post('spin', body);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error('different error than axios');
    }
  }
};
