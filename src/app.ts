import express from 'express';
import 'reflect-metadata';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
// import DBConnection from './loaders/ormconfig';
import { boardContext } from './middleware/boardContext';
import {
  requestLogger,
  errorLogger,
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './errorhandler/errHandler';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { taskRouter } from './resources/tasks/task.router';

// const app = DBConnection.then((connect) => {
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app = express();

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);
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
app.use('/boards/:boardId/tasks', boardContext, taskRouter);
app.use(errorLogger);
app.use(errorHandler);

// return app;
// }).catch((err) => {
//   console.log('err', err);
//   return err;
// });

export default app;
