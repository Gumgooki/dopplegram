const router = require('express').Router()
const {Image, User, Comment, Like} =  require('../db/models')
const multer = require('multer')

router.get('/', async(req, res, next) => {
  try {
    const allImages = await Image.findAll({
      //including this on any image instance just because we will want to eventuall access the username, comments, and whatnot
      include: [{
        model: User,
        attributes: ['userName']
      },{
        model: Comment,
        include:[{
          model: User,
          attributes: ['userName']
        }]
      }]
    })
    res.json(allImages)
  } catch(err){
    next(err)
  }
})


router.get('/:id', async(req, res, next) => {
  try {
      let userImages = await Image.findAll({
        where: {userId: req.params.id},
        include: [{
          model: User,
          attributes: ['userName']
        },{
          model: Comment,
          include:[{
            model: User,
            attributes: ['userName']
          }]
        }]
      })
      res.json(userImages)
  } catch(err){
    next(err)
  }
})


//Code needed for to upload with multer and store images on the server
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'public/uploads/')
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    //rejects anything that isn't jpeg or png
    cb(null, false)
  }
}


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})


/// End of code block needed for image upload via Multer
router.post('/:id', upload.single('imageData'), async (req, res, next) => {
  try{
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path.substr(7),
      userId: req.params.id,
      imageDescription: req.body.imageDescription
    })

    await newImage.save()


    let returnImage = await Image.findOne({
      where: {id: newImage.id},
      include: [{
        model: User,
        attributes: ['email']
      },{
        model: Comment,
        include:[{
          model: User,
          attributes: ['userName']
        }]
      },{
        model: Like,
        attributes: ['like']
      }]
    })
    res.status(200).json({
      success:true,
      document: returnImage
    })
  } catch(err){
    next(err)
  }
})




router.delete('/:userId/:imageId', async (req, res, next) => {
  //need to be able to delete an image
  //TODO how do we ensure that only users that own these images can actually delete them?
  //Do we reference the user state ID and incorporate that into the URL? something like /imageId/userId/?
  //There needs to be a better way to check this too; before sending request we need to make sure the ID actually matches with the ID on state, so it can't be spoofed
  //The component should also only load for logged in users; maybe we need an edit image component where you can make edits and also delete? lock this component off
  try{
    const delImage = await Image.destroy({
      where: {
        id: req.params.imageId,
        userId: req.params.userId
      }
    })
    res.status(201).json(delImage)
  } catch(err){
    next(err)
  }
})


module.exports = router
