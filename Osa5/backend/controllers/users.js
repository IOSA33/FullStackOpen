const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (username.length < 3 || name.length < 3) {
        response.status(400).json({"error": "username and name should be atleast 3 characters long"})
        return
    }

    const salted = 10
    const passwordHash = await bcrypt.hash(password, salted)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

module.exports = usersRouter