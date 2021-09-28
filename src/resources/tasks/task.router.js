const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});
router.route('/').post(async (req, res, next) => {
  try {
    const task = await tasksService.create(req.params.boardId, req.body);
    res.status(201).json(task);
  } catch (err) {
    if (err.message === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});
router.route('/:taskId').get(async (req, res, next) => {
  try {
    const task = await tasksService.getOne(req.params.taskId);
    res.json(task);
  } catch (err) {
    if (err.message === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const task = await tasksService.updateOne(req.params.taskId, req.body);
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

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    await tasksService.delete(req.params.taskId);
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
