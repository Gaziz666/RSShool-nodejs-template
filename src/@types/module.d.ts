import { ErrorRequestHandler, Request } from 'express';
export interface IError extends ErrorRequestHandler {
  stack?: string;
  message?: string;
}

export interface IRequest extends Request {
  params: {
    userId?: Record<string>;
    boardId?: Record<string>;
    taskId?: Record<string>;
  };
  boardId?: string;
}
