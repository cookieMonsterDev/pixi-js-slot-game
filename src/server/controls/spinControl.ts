import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { spinService } from './spinService';

export const spinControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const result = await spinService(req.body);
    res.status(200).json(result);
  }
);
