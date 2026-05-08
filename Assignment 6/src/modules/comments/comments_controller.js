import { Comments } from '../../DB/models/comments_model.js'
import { users } from '../../DB/models/users_model.js'
import { Posts } from '../../DB/models/Posts_model.js'
import { Op } from 'sequelize'

export const createBulkComments = async (req, res) => {
    try {
        const { comments } = req.body
        await Comments.bulkCreate(comments)
        return res.status(201).json({ message: 'comments created.' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const { userId, content } = req.body
        const comment = await Comments.findByPk(commentId)
        if (!comment) return res.status(404).json({ message: 'comment not found.' })
        if (comment.userId !== parseInt(userId)) return res.status(403).json({ message: 'You are not authorized to update this comment.' })
        comment.content = content
        await comment.save()
        return res.status(200).json({ message: 'Comment updated.' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const findOrCreateComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body
        const [comment, created] = await Comments.findOrCreate({ where: { postId, userId, content } })
        return res.status(200).json({ comment, created })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const searchComments = async (req, res) => {
    try {
        const { word } = req.query
        const { count, rows } = await Comments.findAndCountAll({
            where: { content: { [Op.like]: `%${word}%` } }
        })
        if (count === 0) return res.status(404).json({ message: 'no comments found.' })
        return res.status(200).json({ count, comments: rows })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params
        const comments = await Comments.findAll({
            where: { postId },
            order: [['createdAt', 'DESC']],
            limit: 3,
            attributes: ['id', 'content', 'createdAt']
        })
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comments.findByPk(id, {
            include: [
                { model: users, as: 'user', attributes: ['id', 'name', 'email'] },
                { model: Posts, as: 'Post', attributes: ['id', 'title', 'content'] }  // ← capital P
            ]
        })
        if (!comment) return res.status(404).json({ message: 'no comment found' })
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}