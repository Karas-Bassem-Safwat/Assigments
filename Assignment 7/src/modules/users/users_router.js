import { Router } from 'express'
import {
    createUser,
    createOrUpdateUser,
    getUserByEmail,
    getUserById
} from './users_controller.js'

const usersRouter = Router()

usersRouter.post('/signup', createUser)
usersRouter.put('/:id', createOrUpdateUser)
usersRouter.get('/by-email', getUserByEmail)
usersRouter.get('/:id', getUserById)

export default usersRouter
