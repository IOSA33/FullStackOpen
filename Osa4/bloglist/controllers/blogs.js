const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !author || !url || likes === undefined) {
    return response.status(400).json({
      error: 'missing required fields'
    })
  }

  const blog = new Blog({title, author, url, likes})

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogRouter