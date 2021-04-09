const Sequelize = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
  commentText: {
    type: Sequelize.STRING,
    required: true
  },
})

module.exports = Comment
