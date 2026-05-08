import { Router } from 'express'
import {
    createPost,
    deletePost,
    getPostsWithDetails,
    getPostsWithCommentCount
} from './posts_controller.js'

const postsRouter = Router()

postsRouter.post('/', createPost)
postsRouter.delete('/:postId', deletePost)
postsRouter.get('/details', getPostsWithDetails)
postsRouter.get('/comment-count', getPostsWithCommentCount)

export default postsRouter
