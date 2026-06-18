const dummy = (blogs) => {
    return 1
}  

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes,
        0
    )
}

const favoriteBlog = (blogs) => {
    let most_popular_blog = {}
    let most_likes_in_popular_blog = 0

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > most_likes_in_popular_blog) {
            most_popular_blog = blogs[i]
            most_likes_in_popular_blog = blogs[i].likes
        }
    }

    return most_popular_blog
}

const mostBlogs = (blogs) => {
    const map = new Map()

    for (let i = 0; i < blogs.length; i++) {
        const key = blogs[i].author

        if (map.has(key)) {
            map.set(key, map.get(key) + 1)
        } else {
            map.set(key, 1)
        }
    }

    const result = [...map.entries()].reduce((a, e) => e[1] > a[1] ? e : a)

    return {
        "author": result[0],
        "blogs": result[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}