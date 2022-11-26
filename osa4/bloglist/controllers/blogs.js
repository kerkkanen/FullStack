const blogsRouter = require('express').Router()
const { runInContext } = require('lodash')
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  })
  
  blogsRouter.post('', async (request, response, next) => {
    const body = request.body

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).end()
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const { likes } = request.body
    const updatedBlog = await 
      Blog.findByIdAndUpdate(
        request.params.id,
        { likes },
        { new: true, runValidators: true, context : 'query'}
      )
      response.json(updatedBlog)
  })

  module.exports = blogsRouter