const router = require('express').Router()
const {Image} =  require('../db/models')
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

router.post('/', upload.single('imageData'),  (req, res, next) => {
  try{
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    })

    newImage.save()
      .then((result)=> {
        res.status(200).json({
          success:true,
          document: result
        })
      })
  } catch(err){
    next(err)
  }
})

module.exports = router
