const Sequelize = require('sequelize')
const db = require('../db')
const Image =  require('./image')

//not sure if this should be boolean or not tbh; i basically just need the ID; if its true it exists, if its false it shouldn't exist
const Like = db.define('like', {
  like: {
    type: Sequelize.BOOLEAN,
  }
})

//enabling a way to get an accurate count of how many likes an image has without crawling the whole database everytime we render
Like.afterUpdate(async like => {
  const image = await Image.findByPk(like.imageId)
  const [data] = await Like.findAll({
    where: {
      imageId: like.imageId
    },
    attributes: [
      'imageId',
      [Sequelize.fn('count', Sequelize.col('imageId')), 'totalLikes']
    ],
    group:['like.imageId'],
    raw: true
  })
  const {totalLikes} = data
  console.log('the total like', totalLikes)
  image.totalLikes = totalLikes
  await image.save()
})

module.exports = Like


