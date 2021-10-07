import { ErrorRequestHandler } from 'express';
export interface IError extends ErrorRequestHandler {
  stack?: string;
  message?: string;
}
