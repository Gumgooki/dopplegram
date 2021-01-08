const Sequelize = require('sequelize')
const db = require('../db')

const ImageSchema = db.define('image', {
  imageName: {
    type: Sequelize.STRING,
    defaultValue: "none",
    required: true
  },
  imageData: {
    type: Sequelize.STRING,
    required: true
  }
})

module.exports = ImageSchema