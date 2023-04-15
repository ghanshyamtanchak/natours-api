const express = require('express');

const moragn = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

app.use(moragn('dev'))

app.use(express.json());


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app