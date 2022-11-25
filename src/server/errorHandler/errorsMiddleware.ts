import { Response, Request, NextFunction } from 'express';
import HttpErrors from './httpErrors';

const errorHandler = (
  err: HttpErrors,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status: status,
    message: message,
    stack: err.stack,
  });
};

export default errorHandler;