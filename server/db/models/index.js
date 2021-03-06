const User = require('./user')
const Image = require('./image')
const Comment = require('./comment')
const Like = require('./like')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 /**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Image)
Image.belongsTo(User)

Comment.belongsTo(Image)
Image.hasMany(Comment)
Comment.belongsTo(User)
User.hasMany(Comment)

Like.belongsTo(Image)
Image.hasMany(Like)
Like.belongsTo(User)
User.hasMany(Like)

module.exports = {
  User,
  Image,
  Comment,
  Like
}
