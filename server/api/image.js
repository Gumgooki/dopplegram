const router = require('express').Router()
const {Image, User} =  require('../db/models')


router.get('/', async(req, res, next) => {
  try {
    const allImages = await Image.findAll()
    res.json(allImages)
  } catch(err){
    next(err)
  }
})


router.get('/:id', async(req, res, next) => {
  try {
      let userImages = await Image.findAll({
        where: {userId: req.params.id},
        //right now we attach the endite user block. we probably don't need this here. Honestly it makes a little more sense to put this on the one that fetches all the images, so we can get stuff like usernames and whatnot.
        include: [{
          model: User
        }]
      })
      res.json(userImages)
  } catch(err){
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  console.log(req)
  try {
    const newImage = await Image.create({
      imageURL: req.data,
      userId: req.params.id
    })
    res.json(newImage)
  } catch(err) {
    next(err)
  }
})

module.exports = router
