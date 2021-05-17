const router =  require('express').Router()
const {Image, User, Like} = require('../db/models')

router.get('/:imageId/:userId', async(req, res, next) => {
  try{
    const userId = req.params.userId
    const imageId = req.params.imageId

    const didLike = await Like.findOne({
      where: {
        userId: userId,
        imageId: imageId
      }
    })

    res.json(didLike)

  }catch(err){
    next(err)
  }
})

router.post('/:imageId/:userId/', async(req, res, next) => {
  try{
    const userId = req.params.userId
    const imageId = req.params.imageId
    const newLike = req.body.like
    const like = await Like.create({like: newLike})

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


router.delete('/:imageId/:userId', async(req, res, next) => {
  const userId = req.params.userId
  const imageId = req.params.imageId
  try{
    const delLiked = await Like.destroy({
      where: {
        userId: userId,
        imageId: imageId
      }
    })
    const deLikedImage = await Image.findOne({
      where: {
        id: imageId
      }
    })
    deLikedImage.decrement('totalLikes', {by: 1})

    res.status(201).json(delLiked)
  } catch(err){
    next(err)
  }
})

module.exports = router
