const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const app = express();

// app.use(cors({
//     origin: 'http://localhost:8080',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
//     allowedHeaders: ['Authorization', 'Content-Type'],
// }));

// Allowing any origin, just during development phase of the project
app.use(cors());

app.use(cookieParser());

const userRouter = require('./routes/userRoutes');

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// Routes
app.use('/api/users', userRouter);

// Errors handling
app.use(globalErrorHandler);

module.exports = app;

