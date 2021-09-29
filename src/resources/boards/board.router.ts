const router = require('express').Router();
const boardsService = require('./board.service');
const taskService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});
router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    if (err.message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});
router.route('/:boardId').get(async (req, res, next) => {
  try {
    const board = await boardsService.getOne(req.params.boardId);
    res.json(board);
  } catch (err) {
    if (err.message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  try {
    const board = await boardsService.updateOne(req.params.boardId, req.body);
    res.json(board);
  } catch (err) {
    if (err.message === 'notFound') {
      res.sendStatus(404);
    } else if (err.message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  try {
    await boardsService.delete(req.params.boardId);
    res.sendStatus(204);
  } catch (err) {
    if (err.message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

// task routes
router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const task = await taskService.getAll(req.params.boardId);
    res.json(task);
  } catch (err) {
    if (err.message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const task = await taskService.create(req.params.boardId, req.body);
    res.status(201).json(task);
  } catch (err) {
    if (err.message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const task = await taskService.getOne(
      req.params.boardId,
      req.params.taskId
    );
    res.json(task);
  } catch (err) {
    if (err.message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  try {
    const task = await taskService.updateOne(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.json(task);
  } catch (err) {
    if (err.message === 'notFound') {
      res.sendStatus(404);
    } else if (err.message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  try {
    await taskService.delete(req.params.boardId, req.params.taskId);
    res.sendStatus(204);
  } catch (err) {
    if (err.message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

module.exports = router;
