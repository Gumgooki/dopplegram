// we create an instance of the DB in it's own module, because we make new sequelize instances for our models as well; it's just cleaner this way.

const Sequelize = require('sequelize')


//setting it up to use the DATABASE_URL from proccess.env; this is supposed to allow Heroku Postgres to work, but will need to double check and see if i need to create a process.env file special.
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/dopplegram', {
  logging: false //false for now, can change later
  //we can put a bunch of other options here; might be worth checking out what we should put in the boilerplate
})

module.exports = db
