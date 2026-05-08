import { Posts } from '../../DB/models/Posts_model.js'
import { users } from '../../DB/models/users_model.js'
import { Comments } from '../../DB/models/comments_model.js'
import { fn, col } from 'sequelize'

export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body
        const post = new Posts({ title, content, userId })
        await post.save()
        return res.status(201).json({ message: 'Post created successfully.' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const { userId } = req.body
        const post = await Posts.findByPk(postId)
        if (!post) return res.status(404).json({ message: 'Post not found.' })
        if (post.userId !== parseInt(userId)) return res.status(403).json({ message: 'You are not authorized to delete this post.' })
        await post.destroy()
        return res.status(200).json({ message: 'Post deleted.' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPostsWithDetails = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: ['id', 'title'],
            include: [
                { model: users, as: 'user', attributes: ['id', 'name'] },
                { model: Comments, as: 'Comments', attributes: ['id', 'content'] }
            ]
        })
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPostsWithCommentCount = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: ['id', 'title', [fn('COUNT', col('Comments.id')), 'commentCount']],
            include: [{ model: Comments, as: 'Comments', attributes: [] }],
            group: ['Posts.id']
        })
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}