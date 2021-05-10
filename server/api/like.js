const router =  require('express').Router()
const {Image, User, Like} = require('../db/models')

router.post('/:imageId/:userId/', async(req, res, next) => {
  try{
    const userId = req.params.userId
    const imageId = req.params.imageId
    const newLike = req.body.like
    const like = await Like.create({like: newLike})
    // const image = await Image.findOne({
    //   where: {
    //     id: imageId
    //   },
    // })
    // const user = await User.findOne({
    //   where: {
    //     id: userId
    //   }
    // })
    const image = await Image.findByPk(imageId)
    const user = await User.findByPk(userId)
    await image.addLike(like)
    await user.addLike(like)
    await like.setImage(image)
    await like.setUser(user)

    //TODO: do we need anything else here? the actual creation of the like should alter the image model to get an actual count

    res.json(like)

  } catch(err){
    next(err)
  }
})

module.exports = router
