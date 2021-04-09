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
    const userId = req.body.userId
    const imageId = req.body.imageId
    const newComment = req.body.Comment
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
    await user.addComment(comment)
    await comment.setImage(image)
    res.json(image)
  } catch(err){
    next(err)
  }
})
