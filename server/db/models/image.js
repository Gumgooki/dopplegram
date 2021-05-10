const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageName: {
    type: Sequelize.STRING,
    defaultValue: "none",
    required: true
  },
  imageData: {
    type: Sequelize.STRING,
    required: true
  },
  imageDescription: {
    type: Sequelize.STRING,
    required: true
  },
  totalLikes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports = Image
