const express = require('express');
// require('dotenv').config();
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');

const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

const NotFoundError = require('./error/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });
app.use(express.json());

app.use(requestLogger);

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/\S+/),
  }),
}), createUser);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use('*', (req, res, next) => {
  next(new NotFoundError('Данной страницы не существует'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
