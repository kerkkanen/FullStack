const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when some blogs are saved', () => {

  test('right amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs are returned as json' , async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog identifier is called id' , async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })  
  })
})

describe('when blogs are added', () => {

  test('blogs number increases by one when a blog is added', async () => {
    const newBlog = {
                      title: "Peact ratterns",
                      author: "Chichael Man",
                      url: "https://reactpatterns.com/",
                      likes: 14
                    }
    const start = await helper.blogsInDb()
    const before = start.length
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const end = await helper.blogsInDb()
    const after = end.length
    const authors = end.map(b => b.author)
    
    expect(authors).toContain('Chichael Man')
    expect(after - before).toBe(1)
  })

  test('if likes not set, zero likes when blog added', async () => {
    const newBlog = {
                      title: "Is Harmful",
                      author: "Degsger X. Ejskstra",
                      url: "https://reactpatterns.com/"
                    }  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const latest = response[response.length -1]
    
    expect(latest.likes).toBe(0) 
  })

  test('if title or url not set, response is 400 Bad Request', async () => {
    const first = {
                      title: "Is Harmful",
                      author: "Degsger X. Ejskstra"
                    }

  const second = {                   
                      author: "Degsger X. Ejskstra",
                      url: "https://reactpatterns.com/"
                    }  
    await api
      .post('/api/blogs')
      .send(first)
      .expect(400)

  await api
    .post('/api/blogs')
    .expect(400)
  })
})

describe('when blog is deleted', () => {

  test('when deleted, 204 is returned', async () => {
    const start = await helper.blogsInDb()
    const deleted = start[0]

    await api
      .delete(`/api/blogs/${deleted.id}`)
      .expect(204)
    
    const end = await helper.blogsInDb()

    expect(start.length - end.length).toBe(1)
  })
})

describe('when blog is updated', () => {

  test('when updated, number of likes increases by one', async () => {
    const start = await helper.blogsInDb()
    const blog = start[0]
    
    const likes = blog.likes + 1
    const newLikes = {likes: likes}  

    const updatedBlog = await api
      .put(`/api/blogs/${blog.id}`)
      .send(newLikes)

    expect(updatedBlog.body.likes - blog.likes).toBe(1)  
  })
})  

afterAll(() => {
  mongoose.connection.close()
})


