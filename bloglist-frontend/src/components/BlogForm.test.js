import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> receive the right details on call onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = component.container.querySelector('#blogTitle')
  const inputAuthor = component.container.querySelector('#blogAuthor')
  const inputUrl = component.container.querySelector('#blogUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {target: { value: 'blog Title' } })
  fireEvent.change(inputAuthor, {target: { value: 'blog Author' } })
  fireEvent.change(inputUrl, {target: { value: 'blog Url' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blog Title')
  expect(createBlog.mock.calls[0][0].author).toBe('blog Author')
  expect(createBlog.mock.calls[0][0].url).toBe('blog Url')
})