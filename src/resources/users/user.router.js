const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});
router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(User.toResponse(user));
  } catch (err) {
    if (err === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});
router.route('/:userId').get(async (req, res, next) => {
  try {
    const user = await usersService.getOne(req.params.userId);
    res.json(User.toResponse(user));
  } catch (err) {
    if (err === 'notFound') {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
});

router.route('/:userId').put(async (req, res, next) => {
  try {
    const user = await usersService.updateOne(req.params.userId, req.body);
    res.json(User.toResponse(user));
  } catch (err) {
    if (err === 'notFound') {
      res.sendStatus(404);
    } else if (err === 'badRequest') {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

router.route('/:userId').delete(async (req, res, next) => {
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

module.exports = router;
