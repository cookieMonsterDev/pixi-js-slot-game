import { GameOutcome, SpinParams } from '../../shared/GameOutcome';
import HttpErrors from '../errorHandler/httpErrors';

export const spinService = async (params: SpinParams): Promise<GameOutcome> => {
  try {
    params = await verifyParams(params);
    const outCome = await getOutCome(params);
    const win = await getWinType(outCome);
    const bonus = await getBonus();

    return {
      outCome: outCome,
      winType: win,
      bonus: bonus,
    };
  } catch (err) {
    throw new HttpErrors(`${err.message}`, err.status);
  }
};

const getOutCome = async (params: SpinParams): Promise<number[]> => {
  return Array.from({ length: params.symbolsQuantity }, () => {
    const min = Math.ceil(params.bottomBorder);
    const max = Math.floor(params.topBorder);
    return Math.floor(Math.random() * (max - min + 1) + min);
  });
};

const getWinType = async (arr: number[]): Promise<string> => {
  const res = [];
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] !== arr[0]) {
      break;
    }
    res.push(arr[i]);
  }

  switch (res.length) {
    case 3:
      return 'Big Win';
    case 2:
      return 'Small Win';
    default:
      return 'No win';
  }
};

const getBonus = async (): Promise<boolean> => {
  return Math.random() > 0.1 ? false : true;
};

const verifyParams = async (params: SpinParams): Promise<SpinParams> => {
  try {
    if (params.symbolsQuantity < 1)
      throw new HttpErrors('The symbolsQuantity can not be less 1', 400);

    if (params.bottomBorder < 0 || params.topBorder < 0)
      throw new HttpErrors('The bottomBorder and topBorder must be positive', 400);

    return params;
  } catch (err) {
    throw new HttpErrors(`Validation failed: ${err.message}`, err.status);
  }
};
