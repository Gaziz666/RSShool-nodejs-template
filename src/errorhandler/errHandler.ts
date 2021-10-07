import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { IError } from '../@types/module';

const path = 'log/log.txt';

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
  next(err);
};

export const errorHandler = (err: IError, _req: Request, res: Response) => {
  res.status(500);
  res.render('error', { error: err });
};

export const uncaughtExceptionHandler = (err: IError) => {
  fs.appendFile(
    path,
    `uncaughtExceptionHandler: ${err.stack || err.message}`,
    (err) => {
      console.log(err);
    }
  );
  process.exit(1);
};

export const unhandledRejectionHandler = (err: IError) => {
  fs.appendFile(
    path,
    `unhandledRejectionHandler: ${err.stack || err.message}`,
    (err) => {
      console.log(err);
    }
  );
  process.exit(1);
};
