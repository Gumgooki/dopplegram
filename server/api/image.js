const router = require('express').Router()
const {Image, User} =  require('../db/models')
const multer = require('multer')

router.get('/', async(req, res, next) => {
  try {
    const allImages = await Image.findAll({
      //including this on any image instance just because we will want to eventuall access the username, comments, and whatnot
      include: [{
        model: User,
        attributes: ['email']
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
          attributes: ['email']
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
      userId: req.params.id
    })

    await newImage.save()


    let returnImage = await Image.findOne({
      where: {id: newImage.id},
      include: [{
        model: User,
        attributes: ['email']
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

module.exports = router
