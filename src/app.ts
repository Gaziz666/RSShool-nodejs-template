import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import {
  requestLogger,
  errorLogger,
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './errorhandler/errHandler';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(requestLogger);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(errorLogger);
app.use(errorHandler);
throw Error('Oops!');
process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

export default app;
