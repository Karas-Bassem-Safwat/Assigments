import { users } from '../../DB/models/users_model.js'


export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const existingUser = await users.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' })
        }

        const newUser = users.build({ name, email, password, role })
        await newUser.save()

        return res.status(201).json({ message: 'User added successfully.' })
    } catch (error) {
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') })
        }
        return res.status(500).json({ message: error.message })
    }
}


export const createOrUpdateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password, role } = req.body

        await users.upsert(
            { id, name, email, password, role },
            { validate: false }
        )

        return res.status(200).json({ message: 'User created or updated successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query

        const user = await users.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({ message: 'no user found' })
        }

        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await users.findByPk(id, {
            attributes: { exclude: ['role'] }
        })
        if (!user) {
            return res.status(404).json({ message: 'no user found' })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
