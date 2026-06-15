const express = require('express')
const mongoose = require('mongoose')
var morgan = require('morgan')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const personRouter = require('./controllers/persons')

const app = express()
logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch( (error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

morgan.token('body', req => req.bodyData)
morgan.token('info', function (req, res) {
  return `${req.method} ${req.url} ${res.statusCode}`
})

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  req.bodyData = JSON.stringify(req.body)
  next()
})
app.use(morgan(':info :res[content-length] - :response-time ms :body'))
app.use(middleware.requestLogger)

app.use('/api/persons', personRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app