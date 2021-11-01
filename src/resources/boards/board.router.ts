import router, { Response, NextFunction } from 'express';
import { IRequest } from '../../@types/module';
import { boardsService } from './board.service';
// import { tasksService } from '../tasks/task.service';

const Router = router.Router();

Router.route('/').get(
  async (_req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const boards = await boardsService.getAll();
      res.json(boards);
    } catch (err) {
      next(err);
    }
  }
);

Router.route('/').post(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const board = await boardsService.create(req.body);
      res.status(201).json(board);
    } catch (err) {
      if ((err as Error).message === 'badRequest') {
        res.sendStatus(400);
      } else {
        console.log('err', err);
        next(err);
      }
    }
  }
);

Router.route('/:boardId').get(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
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
  }
);

Router.route('/:boardId').put(
  async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
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
  }
);

Router.route('/:boardId').delete(
  async (req: IRequest, res: Response, next: NextFunction) => {
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
  }
);

// task routes
// Router.route('/:boardId/tasks').get(async (req: IRequest, res: Response, next: NextFunction) => {
//   try {
//     const task = await tasksService.getAll(req.params.boardId);
//     res.json(task);
//   } catch (err) {
//     if ((err as Error).message === 'badRequest') {
//       res.sendStatus(400);
//     } else {
//       next(err);
//     }
//   }
// });

// Router.route('/:boardId/tasks').post(async (req: IRequest, res: Response, next: NextFunction) => {
//   try {
//     const task = await tasksService.create(req.params.boardId, req.body);
//     res.status(201).json(task);
//   } catch (err) {
//     if ((err as Error).message === 'badRequest') {
//       res.sendStatus(400);
//     } else {
//       next(err);
//     }
//   }
// });

// Router.route('/:boardId/tasks/:taskId').get(async (req: IRequest, res: Response, next: NextFunction) => {
//   try {
//     const task = await tasksService.getOne(
//       req.params.boardId,
//       req.params.taskId
//     );
//     res.json(task);
//   } catch (err) {
//     if ((err as Error).message === 'notFound') {
//       res.sendStatus(404);
//     } else {
//       next(err);
//     }
//   }
// });

// Router.route('/:boardId/tasks/:taskId').put(async (req: IRequest, res: Response, next: NextFunction) => {
//   try {
//     const task = await tasksService.updateOne(
//       req.params.boardId,
//       req.params.taskId,
//       req.body
//     );
//     res.json(task);
//   } catch (err) {
//     if ((err as Error).message === 'notFound') {
//       res.sendStatus(404);
//     } else if ((err as Error).message === 'badRequest') {
//       res.sendStatus(400);
//     } else {
//       next(err);
//     }
//   }
// });

// Router.route('/:boardId/tasks/:taskId').delete(async (req: IRequest, res: Response, next: NextFunction) => {
//   try {
//     await tasksService.delete(req.params.taskId);
//     res.sendStatus(204);
//   } catch (err) {
//     if ((err as Error).message === 'notFound') {
//       res.sendStatus(404);
//     } else {
//       next(err);
//     }
//   }
// });

export { Router as boardRouter };
