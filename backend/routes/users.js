const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const RegexUrl = require('../utils/constants');

const {
  getUsers, returnUserId, updateProfile, updateAvatar, returnProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', returnProfile);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), returnUserId);
router.patch('/me', celebrate({
  body: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  },
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().regex(RegexUrl),
  },
}), updateAvatar);

module.exports = router;
