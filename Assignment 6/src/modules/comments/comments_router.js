import { Router } from 'express'
import {
    createBulkComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentById
} from './comments_controller.js'

const commentsRouter = Router()

commentsRouter.post('/', createBulkComments)
commentsRouter.patch('/:commentId', updateComment)
commentsRouter.post('/find-or-create', findOrCreateComment)
commentsRouter.get('/search', searchComments)
commentsRouter.get('/newest/:postId', getNewestComments)
commentsRouter.get('/details/:id', getCommentById)

export default commentsRouter
