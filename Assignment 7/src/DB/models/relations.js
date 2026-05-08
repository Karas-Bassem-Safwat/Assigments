import { users } from './users_model.js'
import { Posts } from './Posts_model.js'
import { Comments } from './comments_model.js'

export const realtions = () => {
    users.hasMany(Posts, { foreignKey: 'userId', as: 'Posts' })
    Posts.belongsTo(users, { foreignKey: 'userId', as: 'user' })

    Posts.hasMany(Comments, { foreignKey: 'postId', as: 'Comments' })
    Comments.belongsTo(Posts, { foreignKey: 'postId', as: 'Post' })  // ← capital P

    users.hasMany(Comments, { foreignKey: 'userId', as: 'Comments' })
    Comments.belongsTo(users, { foreignKey: 'userId', as: 'user' })
}