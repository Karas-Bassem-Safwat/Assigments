import express from 'express'
import { test_connection } from './DB/connection.js'
import { users } from './DB/models/users_model.js'
import { Posts } from './DB/models/Posts_model.js'
import { Comments } from './DB/models/comments_model.js'
import { realtions } from './DB/models/relations.js'
import usersRouter from './modules/users/users_router.js'
import postsRouter from './modules/posts/posts_router.js'
import commentsRouter from './modules/comments/comments_router.js'

await test_connection()
realtions()

const app = express()
app.use(express.json())

export const bootstrap = async () => {
    const port = 3000

    await users.sync({ alter: false, force: false })
    await Posts.sync({ alter: true, force: false })
    await Comments.sync({ alter: false, force: false })

    
    app.use('/users', usersRouter)
    app.use('/user', usersRouter)   
    app.use('/posts', postsRouter)
    app.use('/comments', commentsRouter)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}
