require('dotenv').config()

// Without this mongodb throws reject state,because of newest node js version
// const dns = require('node:dns')
// dns.setServers(['1.1.1.1', '1.0.0.1'])

const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', req => req.bodyData)
morgan.token('info', function (req, res) {
  return `${req.method} ${req.url} ${res.statusCode}`
})

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use((req, res, next) => {
  req.bodyData = JSON.stringify(req.body)
  next()
})

app.use(morgan(':info :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

const getData = async () => {
  const DB = await Person.find({})
  return DB.length
}

app.get('/info', async (request, response) => {
  const timestamp = new Date()

  const length = await getData()

  response.send('<p>Phonebook has info for '+length+' people</p> <p>'+timestamp.toString()+'</p>')
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(result => {
      if (!result) {
        response.status(404).end()
      }

      result.name = name
      result.number = number

      return result.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (body.name.length < 3) {
    return response.status(400).json({
      error: `Person validation failed: name: Path \`name\` (\`${body.name}\`) is shorter than the minimum allowed length (3).`
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch( () => {
    response.status(400).json({ error: 'example: 12-345678 or 123-456789' })
  })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

