const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Router
const v1 = '/api/v1';
const authRouter = require('./app/api/v1/auth/router');
const usersRouter = require('./app/api/v1/users/router');
const followRouter = require('./app/api/v1/follow/router');
const threadsRouter = require('./app/api/v1/threads/router');
const likeThreadsRouter = require('./app/api/v1/likeThreads/router');
const commentsRouter = require('./app/api/v1/comments/router');
const likeCommentsRouter = require('./app/api/v1/likeComments/router');
const uploadMediaRouter = require('./app/api/v1/media/router');
//

// Middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');
//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to API Zynora',
  });
});

// App Router
app.use(`${v1}/cms`, authRouter);
app.use(`${v1}/cms`, usersRouter);
app.use(`${v1}/cms`, followRouter);
app.use(`${v1}/cms`, threadsRouter);
app.use(`${v1}/cms`, likeThreadsRouter);
app.use(`${v1}/cms`, commentsRouter);
app.use(`${v1}/cms`, likeCommentsRouter);
app.use(`${v1}/cms`, uploadMediaRouter);
//

// App Middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);
//

module.exports = app;
