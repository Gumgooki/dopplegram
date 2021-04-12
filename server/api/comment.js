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
    const userId = req.params.userId
    const imageId = req.params.imageId
    const newComment = req.body.comment
    const comment = await Comment.create({commentText: newComment})
    const image = await Image.findOne({
      where: {
        id: imageId
      },
    })
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    await user.addComment(comment)
    await comment.setImage(image)

    const sendComment = await Comment.findOne({
      where: {
        id: comment.id
      },
      include: [{
        model: User,
        attributes: ['userName']
      }]
    })
    console.log('sendComment', sendComment)
    res.json(sendComment)
  } catch(err){
    next(err)
  }
})

module.exports = router
