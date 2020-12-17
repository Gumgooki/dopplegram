const router = require('express').Router()
const {Image} =  require('../db/models')

//Created a Model for a basic Image. I have associated it with a user. This is a basic step one. Next up is for me to make a few APIs. Namely a way to create an image, as well get all the images associated with a user (for now).


//i want to make an api that will fetch me all of the images based on a logged in users Id
router.get('/', async(req, res, next) => {
  try {
    //right now just finding all the images, will adjust after i create the thunk
    const userImage = await Image.findAll()
    res.json(userImage)
  } catch(err){
    next(err)
  }
})


router.get('/:id', async(req, res, next) => {
  console.log(req)
  try {
    //this will be to get all images based on userId
  } catch(err){
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  //testing what actually comes through on the button press
  console.log(req.body)
  try {
    const newImage = await Image.create({
      imageURL: req.body.imageURL,
      // userId: req.body.userId.
      //hard coding userID to 1 for testing purposes as we're not actually sending the userId down yet.
      userId: 1
    })
    res.json(newImage)
  } catch(err) {
    next(err)
  }
})

module.exports = router
