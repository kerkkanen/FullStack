const listHelper = require('../utils/list_helper')
const oneBlog = require('./list.js').oneBlog
const blogs = require('./list.js').blogs

describe ('most likes', () => {

    test('of empty list is none', () => {
      const result = listHelper.mostLikes([])
      expect(result).toEqual(null)
    })
  
    test('when list has only one blog the author is the author of this blog', () => {
      const result = listHelper.mostLikes(oneBlog)
      expect(result).toEqual({author: 'Michael Chan', likes: 7} )
    })
  
    test('of a bigger list the one with most likes all together is correct', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
    })
  })