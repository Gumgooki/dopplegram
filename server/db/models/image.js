const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://via.placeholder.com/140x100'
  }
})

module.exports = Image
