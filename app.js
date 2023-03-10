const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());

app.use(express.json());

// Route Handlers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
