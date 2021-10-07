import router from 'express';
import { User } from './user.model';
import { usersService } from './user.service';

const Router = router.Router();
Router.route('/').get(async (_req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

Router.route('/').post(async (req, res, next) => {
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

Router.route('/:userId').get(async (req, res, next) => {
  try {
    const user = await usersService.getOne(req.params['userId']);
    res.json(User.toResponse(user));
  } catch (err) {
    if ((err as Error).message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

Router.route('/:userId').put(async (req, res, next) => {
  try {
    const user = await usersService.updateOne(req.params['userId'], req.body);
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

Router.route('/:userId').delete(async (req, res, next) => {
  try {
    await usersService.deleteOne(req.params.userId);
    res.sendStatus(204);
  } catch (err) {
    if (err === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

export { Router as userRouter };
