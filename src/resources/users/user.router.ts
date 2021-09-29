import router, { ErrorRequestHandler } from 'express';
import { RequestParams } from '../../@types/module';
import User from './user.model';
import usersService from './user.service';

const Router = router.Router();
Router.route('/').get<RequestParams>(async (_req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});
Router.route('/').post<RequestParams>(async (req, res, next) => {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(User.toResponse(user));
  } catch (err) {
    if ((err as Error).message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});
Router.route('/:userId').get<RequestParams>(async (req, res, next) => {
  try {
    const user = await usersService.getOne(req.params.userId);
    res.json(User.toResponse(user));
  } catch (err) {
    if ((err as Error).message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

Router.route('/:userId').put<RequestParams>(async (req, res, next) => {
  try {
    const user = await usersService.updateOne(req.params.userId, req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    if ((err as Error).message === 'notFound') {
      res.sendStatus(404);
    } else if ((err as Error).message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

Router.route('/:userId').delete<RequestParams>(async (req, res, next) => {
  try {
    await usersService.delete(req.params.userId);
    res.sendStatus(204);
  } catch (err) {
    if (err === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

export { Router };
