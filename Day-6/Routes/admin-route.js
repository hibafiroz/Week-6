const express=require('express')
const router=express.Router()
const path=require('path')
const multer=require('multer')
const { adminGet,loginGet,loginPost, profile2 }=require('../Controller/admin-controller')
const bulletins=require('../utils/storage')
const { authMiddleware } = require('../utils/auth')

// router.get('/',(req,res)=>{
//   res.render('adminPage',{bulletins})
// })
// router.get('/admin',adminGet)

router.get('/login',loginGet)
router.post('/login',loginPost)
router.get('/profile2',authMiddleware,profile2)
router.get('/adminPage',authMiddleware,adminGet)


const storage=multer.diskStorage({
  destination: 'public',
  filename: function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({storage})

router.post('/upload',upload.single('file'),(req,res)=>{  //handle a single file upload
  if(req.file){
    bulletins.push(req.file.filename)
    console.log('Uploaded:',req.file);
    res.send('Upload successfull: '+req.file.filename)
  }else{
    res.send('Upload failed')
  }
})

module.exports = router
