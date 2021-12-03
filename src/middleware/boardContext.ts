import { Response, NextFunction } from 'express';
import { IRequest } from '../@types/module';

export const boardContext = (
  req: IRequest,
  _res: Response,
  next: NextFunction
) => {
  if (!req.params.boardId) {
    throw new Error('Params boardId is required');
  }
  req.boardId = req.params.boardId;
  next();
};
