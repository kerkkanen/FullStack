const listHelper = require('../utils/list_helper')
const oneBlog = require('./list.js').oneBlog
const blogs = require('./list.js').blogs


describe ('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(oneBlog)).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

})