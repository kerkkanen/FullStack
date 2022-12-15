const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const user = request.user
  
  if (!request.token || !(user)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const body = request.body

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({
      error: 'title or url not defined'
    })
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'unauthorized action'})
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog
    .findById(request.params.id).populate('user', {username: 1, name: 1})

  response.json(blog)
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