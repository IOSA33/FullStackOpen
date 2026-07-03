const { test, after, beforeEach, before, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        "title":	"HELLOSir",
        "author":	"YESSIR1",
        "url":	"FFF//WW12.COM",
        "likes":	432,
        "userId": "6a48048ae5e528f1cf8a37e8"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title)
    assert(contents.includes('HELLOSir'))
})

test('blog without likes is added', async () => {
    const newBlog = {
        "title":	"HELLOSir",
        "author":	"YESSIR1",
        "url": "FFF//WW12.COM"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('blog without url and title is not added', async () => {
    const newBlog = {
        "author":	"YESSIR1",
        "likes": 223
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('identifier named id ', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlog = blogsAtStart[0]

    assert(firstBlog.id)
})

test('updating likes ', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlog = blogsAtStart[0]
    const updatedBlog = {
        likes: 333
    }

    await api
        .put(`/api/blogs/${firstBlog.id}`)
        .send(updatedBlog)
        .expect(200)

    const getBlogs = await helper.blogsInDb()
    const newFirstBlog = getBlogs[0]

    assert.strictEqual(newFirstBlog.likes, 333)
})


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
        username: 'mluukkai',
        name: 'MattiLuukkainen',
        password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    
    test.only('creation fails with proper statuscode and message if username or name is shorter than 3 chars', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
        username: 'ro',
        name: 'Superuser',
        password: 'salainen',
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('username and name should be atleast 3 characters long'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})