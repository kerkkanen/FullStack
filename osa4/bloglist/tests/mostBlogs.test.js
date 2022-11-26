const listHelper = require('../utils/list_helper')
const oneBlog = require('./list.js').oneBlog
const blogs = require('./list.js').blogs

describe ('most blogs', () => {

    test('of empty list is none', () => {
      const result = listHelper.mostBlogs([])
      expect(result).toEqual(null)
    })
  
    test('when list has only one blog the author is the author of this blog', () => {
      const result = listHelper.mostBlogs(oneBlog)
      expect(result).toEqual({'author': 'Michael Chan', 'blogs': 1} )
    })
  
    test('of a bigger list the one with most blogs is correct', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
    })
  
  })