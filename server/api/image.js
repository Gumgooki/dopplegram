const router = require('express').Router()
const {Image, User, ImageSchema} =  require('../db/models')
const multer = require('multer')

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


//Code needed for to upload with multer and store images on the server
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

/// End of code block needed for image upload via Multer
//TODO: make sure i set up the post to look for USER ID like the old one; remove the old API; update the component/thunk to look for this API
//NEW POST BLOCK
router.post('/:id', upload.single('imageData'), (req, res, next) => {
  try{
    const newImage = new ImageSchema({
      //TODO: old API just sent one object; because we're making a new object, we'll need to add the User ID onto this or add it to the object that gets posted
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

//OLD ONE
// router.post('/:id', async (req, res, next) => {
//   // TODO should just create one object instead of having to go through the body for imageURL and the params; if we create one object on form upload that has both, we can reduce complexity.
//   try {
//     const newImage = await Image.create(req.body)
//     res.json(newImage)
//   } catch(err) {
//     next(err)
//   }
// })

module.exports = router
