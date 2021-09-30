import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
export type RequestParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
