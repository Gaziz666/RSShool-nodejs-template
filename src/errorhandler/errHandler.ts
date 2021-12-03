import { IError } from './../@types/module.d';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { ResolveConfigOptions } from 'prettier';

const path = 'log/log.txt';
// all errors show on console add date and counter
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  fs.appendFile(
    path,
    `${new Date()} url: ${req.url}, method: ${
      req.method
    }, params: ${JSON.stringify(req.params)}, query: ${JSON.stringify(
      req.query
    )}, body: ${JSON.stringify(req.body)}, statusCode: ${res.statusCode}\n`,
    (err) => {
      if (err) {
        console.error('err', err.message);
        throw err;
      }
    }
  );
  next();
};

export const errorLogger = (
  err: IError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  fs.appendFile(path, `error: ${err.stack}`, (err) => {
    console.log(err);
  });
  console.log(err.stack);
  next(err);
};

export const errorHandler = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500);
  res.json(err.stack);
};

export const uncaughtExceptionHandler = (err: IError) => {
  console.log(err);
  fs.appendFile(
    path,
    `uncaughtExceptionHandler: ${err.stack || err.message}`,
    (err) => {
      console.log(err);
    }
  );
  process.exit(1);
};
// WIP
export const unhandledRejectionHandler = (
  reject: PromiseRejectedResult,
  resolve: ResolveConfigOptions
) => {
  fs.appendFile(
    path,
    `unhandledRejectionHandler: ${reject || resolve}`,
    (err) => {
      console.log(err);
    }
  );
  process.exit(1);
};
