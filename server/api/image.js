const router = require('express').Router()
const {Image} =  require('../db')

//Created a Model for a basic Image. I have associated it with a user. This is a basic step one. Next up is for me to make a few APIs. Namely a way to create an image, as well get all the images associated with a user (for now).

router.post('/', async (req, res, next) => {
  try {
    const newImage = await Image.create({
      url: req.body.url,
      userId: req.body.userId
    })
    res.json(newImage)
  } catch(err) {
    next(err)
  }
})

module.exports = router
