import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: "03w9fj09w3jf039fj039wjf99"
    }

    render(<Blog blog={blog}/>)

    const element = screen.getByText(/component test/)
    expect(element).toBeDefined()
})