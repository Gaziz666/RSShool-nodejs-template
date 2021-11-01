import router, { Response, NextFunction } from 'express';
import { IRequest } from '../../@types/module';
import { tasksService } from './task.service';

const Router = router.Router();
Router.route('/').get(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const task = await tasksService.getAll(req.boardId!);
      res.json(task);
    } catch (err) {
      if ((err as Error).message === 'badRequest') {
        res.sendStatus(400);
      } else {
        next(err);
      }
    }
  }
);

Router.route('/').post(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const task = await tasksService.create(req.boardId!, req.body);
      res.status(201).json(task);
    } catch (err) {
      if ((err as Error).message === 'badRequest') {
        res.sendStatus(400);
      } else {
        next(err);
      }
    }
  }
);

Router.route('/:taskId').get(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const task = await tasksService.getOne(req.boardId!, req.params.taskId);
      res.json(task);
    } catch (err) {
      if ((err as Error).message === 'notFound') {
        res.sendStatus(404);
      } else {
        next(err);
      }
    }
  }
);

Router.route('/:taskId').put(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const task = await tasksService.updateOne(
        req.boardId!,
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
  }
);

Router.route('/:taskId').delete(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      await tasksService.delete(req.boardId!, req.params.taskId);
      res.sendStatus(204);
    } catch (err) {
      if ((err as Error).message === 'notFound') {
        res.sendStatus(404);
      } else {
        next(err);
      }
    }
  }
);

export { Router as taskRouter };
