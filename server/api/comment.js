const router = require('express').Router()
const {Image, Comment, User} =  require('../db/models')


router.get('/:imageId/', async(req, res, next) => {
  try {
      let imageComments = await Image.findAll({
        where: {
          imageId: req.params.imageId
        },
        include: [{
          model: Comment
        }]
      })
      res.json(imageComments)
  } catch(err){
    next(err)
  }
})

router.post('/:imageId/:userId/', async(req, res, next) => {
  try{
    console.log(req.body)
    const userId = req.params.userId
    const imageId = req.params.imageId
    const newComment = req.body.comment
    const comment = await Comment.create(newComment)
    const image = await Image.findOne({
      where: {
        id: imageId
      }
    })
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    // await user.addComment(comment)
    // await comment.setImage(image)
    res.json(image)
  } catch(err){
    next(err)
  }
})

module.exports = router
