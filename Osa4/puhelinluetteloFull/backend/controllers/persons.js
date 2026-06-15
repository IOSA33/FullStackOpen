const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personRouter.get('/:id', (request, response, next) => {
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

personRouter.get('/info', async (request, response) => {
  const timestamp = new Date()

  const length = await getData()

  response.send('<p>Phonebook has info for '+length+' people</p> <p>'+timestamp.toString()+'</p>')
})

personRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personRouter.put('/:id', (request, response, next) => {
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

personRouter.post('/', (request, response) => {
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

module.exports = personRouter