import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateForm from './CreateForm'

test('renders content', () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: "03w9fj09w3jf039fj039wjf99"
    }

    render(<Blog blog={blog}/>)

    screen.debug()

    const element = screen.getByText("component test testing author")
    expect(element).toBeDefined()

    const elementNotVisible = screen.getByText(/testing url/)
    expect(elementNotVisible).not.toBeVisible()

})

test('render url and likes when clicked view', async () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: "03w9fj09w3jf039fj039wjf99"
    }

    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)
    
    const urlElement = screen.getByText(/testing url/)
    const likesElement = screen.getByText(/123/)

    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
})

test('like button clicked twise', async () => {
    const blog = {
        title: "component test",
        author: "testing author",
        url: "testing url",
        likes: 123,
        user: "03w9fj09w3jf039fj039wjf99"
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateLikes={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)
    
    const button_like = screen.getByText("like")
    await user.click(button_like)
    await user.click(button_like)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('call the form prop with right values', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<CreateForm createBlog={mockHandler} />)

    const input_title = screen.getByLabelText('title')
    const input_author = screen.getByLabelText('author')
    const input_url = screen.getByLabelText('url')
    const createButton = screen.getByText('create')

    await user.type(input_title, 'testing a title input')
    await user.type(input_author, 'testing a auhtor input')
    await user.type(input_url, 'testing a url input')

    await user.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual({
            title: 'testing a title input',
            author: 'testing a auhtor input',
            url: 'testing a url input'
        })
})