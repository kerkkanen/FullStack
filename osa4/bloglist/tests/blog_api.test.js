const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let authorization

beforeEach(async () => {
  await User.deleteMany({})

  const newUser = {
    username: 'root',
    password: 'password',
  }

  await api
    .post('/api/users')
    .send(newUser)

  const result = await api
    .post('/api/login')
    .send(newUser)

  authorization = {
    Authorization: `bearer ${result.body.token}`,
  }
   
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

  test('401 is returned, when token is missing', async () => {
    const newBlog = {
      title: "Peact ratterns",
      author: "Chichael Man",
      url: "https://reactpatterns.com/",
      likes: 14
    }
    
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
  })

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
      .set(authorization)
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
      .set(authorization)
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
      .set(authorization)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(second)
      .set(authorization)
      .expect(400)
    })
})

describe('when blog is deleted', () => {

  test('when deleted, 204 is returned', async () => {
    const start = await helper.blogsInDb()

    const newBlog = {
      title: "Is Harmful",
      author: "Degsger X. Ejskstra",
      url: "https://reactpatterns.com/"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)
    
    const blogs = await helper.blogsInDb()
    const deleted = blogs[blogs.length-1]

    await api
      .delete(`/api/blogs/${deleted.id}`)
      .set(authorization)
      .expect(204)
    
    const end = await helper.blogsInDb()

    expect(start.length - end.length).toBe(0)
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


