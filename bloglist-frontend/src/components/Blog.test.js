import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'fra',
      url: '---',
      likes: 10
    }
  
    const component = render(
      <Blog blog={blog} />
    )
  
    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(blog.title).toBeDefined()
    expect(blog.author).toBeDefined()
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
})


test('clicking the likes button twice calls event handler twice', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'fra',
      url: '---',
      likes: 10
    }
  
    const mockHandler = jest.fn()
  
    const component = render(<Blog blog={blog} handleUpdateLikes={mockHandler} />)
  
    const button = component.getByText('+1')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
})