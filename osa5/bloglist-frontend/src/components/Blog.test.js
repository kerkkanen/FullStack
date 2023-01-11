import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author, but not other information', () => {
  const user = {
    username: 'testaaja',
  }

  const blog = {
    title: 'Testiblogi',
    author: 'Testibloggaaja',
    likes: 0,
    url: 'www.testi.com',
    user: {
      username: 'testaaja',
    },
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Testiblogi')
  expect(div).toHaveTextContent('Testibloggaaja')
  expect(div).not.toHaveTextContent('www.testi.com')
  expect(div).not.toHaveTextContent('likes')
})

test('clicking view shows likes, url and username', async () => {
  const username = {
    username: 'testaaja',
  }

  const blog = {
    title: 'Testiblogi',
    author: 'Testibloggaaja',
    likes: 0,
    url: 'www.testi.com',
    user: {
      username: 'testaaja',
    },
  }

  render(<Blog blog={blog} user={username} />)

  const user = userEvent.setup()
  const button = screen.getByText('view', { exact: false })
  await user.click(button)

  const url = screen.getByText('www.testi.com', { exact: false })
  const likes = screen.getByText('likes', { exact: false })

  expect(url).toHaveTextContent('www.testi.com')
  expect(likes).toHaveTextContent('likes')
})

test('clicking like button twice calls the function twice shows likes, url and username', async () => {
  const username = {
    username: 'testaaja',
  }

  const blog = {
    title: 'Testiblogi',
    author: 'Testibloggaaja',
    likes: 0,
    url: 'www.testi.com',
    user: {
      username: 'testaaja',
    },
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={username} addLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view', { exact: false })
  await user.click(viewButton)
  const likesButton = screen.getByText('like')
  await user.click(likesButton)
  await user.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> callback-function is called with correct parameters', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  render(<BlogForm createBlog={addBlog} />)

  const title = screen.getByPlaceholderText('title here')
  const author = screen.getByPlaceholderText('author here')
  const url = screen.getByPlaceholderText('url here')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testiblogi')
  await user.type(author, 'testaaja')
  await user.type(url, 'bloki.fi')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testiblogi')
  expect(addBlog.mock.calls[0][0].author).toBe('testaaja')
  expect(addBlog.mock.calls[0][0].url).toBe('bloki.fi')
})
