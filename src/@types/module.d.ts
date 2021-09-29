import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
export type RequestParams = (
  req: GetParams,
  res: Response,
  next: NextFunction
) => void;

interface GetParams extends Request {
  userId: string;
}
