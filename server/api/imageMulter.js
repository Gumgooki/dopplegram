const router = require('express').Router()
const {ImageSchema} =  require('../db/models')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'./public/uploads/')
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

router.post('/', upload.single('imageData'), async (req, res, next) => {
  console.log('after posting')
  try{
    const newImage = await ImageSchema.create({
      imageName: req.body.imageName,
      imageData: req.file.path
    })
    res.status(200).json({
      success: true,
      document: newImage
    })
  } catch(err){
    next(err)
  }
})

module.exports = router
