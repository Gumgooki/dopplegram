const crypto = require('crypto')
const _ = require('lodash')
const Sequelize = require('sequelize')

const db = require('../db')

//placeholder or example of a model

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  // eslint-disable-next-line camelcase
  googleId:{
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
})

User.prototype.correctPassword = function(candidatePassword){
  return User.encryptPassword(candidatePassword, this.salt) === this.password
}

User.prototype.sanitize = function(){
  return _.omit(this.toJSON(), ['password', 'salt'])
}

User.generateSalt = function(){
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt){
  const hash = crypto.createHash('sha1')
  hash.update(plainText)
  hash.update(salt)
  return hash.digest('hex')
}

function setSaltAndPassword(user){
  //we need to salt and hash again when the user enters a password for the first time, and again whenever they change it
  if(user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

module.exports = User


