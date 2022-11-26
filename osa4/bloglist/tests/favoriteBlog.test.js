const listHelper = require('../utils/list_helper')
const oneBlog = require('./list.js').oneBlog
const blogs = require('./list.js').blogs

describe ('favorite blog', () => {

    test('of empty list is none', () => {
      const result = listHelper.favoriteBlog([])
      expect(result).toEqual(null)
    })
  
    test('when list has only one blog the one is the favorite', () => {
      const result = listHelper.favoriteBlog(oneBlog)
      expect(result).toEqual(blogs[0])
    })
  
    test('of a bigger list the favorite blog is the one with most likes', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(blogs[2])
    })
  
  })