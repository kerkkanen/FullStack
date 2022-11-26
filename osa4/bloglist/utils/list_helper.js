var  _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce
            (function(sum, blog) {
            return sum + blog.likes
            }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const list = blogs.map(function(blog) {
        return blog.likes
    })
    
    return blogs[list.indexOf(Math.max(...list))]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authors = _.groupBy(blogs, 'author')
    const total = _.map(authors, function(list, author) {
        return {"author": author, "blogs": list.length}
    })
  
    return _.maxBy(total, 'blogs')
}    

const mostLikes = (blogs => {
    if (blogs.length === 0) {
        return null
    }
    const authors = _.groupBy(blogs, 'author')
    const mapped = _.mapValues(authors, l => {
        const likes = _.sumBy(l, 'likes')
        return likes
    })

    const list = Object.keys(mapped)
    list.sort((a, b) => mapped[b] -mapped[a])
    const author = list.slice(0, 1)

    return {author: author[[0]], likes: mapped[author]}    
})


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

