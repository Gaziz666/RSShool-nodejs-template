import router from 'express';
import { boardsService } from './board.service';
import { tasksService } from '../tasks/task.service';

const Router = router.Router();

Router.route('/').get(async (req, res) => {
  req.headers;
  const boards = await boardsService.getAll();
  res.json(boards);
});
Router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    if ((err as Error).message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});
Router.route('/:boardId').get(async (req, res, next) => {
  try {
    const board = await boardsService.getOne(req.params.boardId);
    res.json(board);
  } catch (err) {
    if ((err as Error).message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

Router.route('/:boardId').put(async (req, res, next) => {
  try {
    const board = await boardsService.updateOne(req.params.boardId, req.body);
    res.json(board);
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

Router.route('/:boardId').delete(async (req, res, next) => {
  try {
    await boardsService.delete(req.params.boardId);
    res.sendStatus(204);
  } catch (err) {
    if ((err as Error).message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

// task routes
Router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const task = await tasksService.getAll(req.params.boardId);
    res.json(task);
  } catch (err) {
    if ((err as Error).message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

Router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const task = await tasksService.create(req.params.boardId, req.body);
    res.status(201).json(task);
  } catch (err) {
    if ((err as Error).message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

Router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const task = await tasksService.getOne(
      req.params.boardId,
      req.params.taskId
    );
    res.json(task);
  } catch (err) {
    if ((err as Error).message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

Router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  try {
    const task = await tasksService.updateOne(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.json(task);
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

Router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    await tasksService.delete(req.params.taskId);
    res.sendStatus(204);
  } catch (err) {
    if ((err as Error).message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

export { Router as boardRouter };
