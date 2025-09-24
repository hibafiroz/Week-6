const express=require('express')
const router=express.Router()
const multer=require('multer')
const fs=require('fs')
const path=require('path')
const { adminGet,loginGet,loginPost, profile2 }=require('../Controller/admin-controller')
const { authMiddleware } = require('../utils/auth')

router.get('/login',loginGet)
router.post('/login',loginPost)
router.get('/profile2',authMiddleware,profile2)

const storage=multer.diskStorage({
  destination:'public/uploads',
  filename:function(req,file,cb){
    console.log(file);
      cb(null,Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({storage})
const filePath=path.join(__dirname,'../utils/bulletins.json')
router.get('/adminPage',authMiddleware,adminGet)
router.post('/adminPage',upload.single('file'),(req,res)=>{
   if(req.file){
    const data=JSON.parse(fs.readFileSync(filePath,'utf-8'))
    data.push({
      filename:req.file.filename,
      uploadTime: new Date().toISOString()
    })
    fs.writeFileSync(filePath,JSON.stringify(data,null,2))
    res.render('adminPage',{message:'Uploaded Successfully'})
   }else{
    res.render('adminPage',{message:'Upload Failed'})
   }
})

module.exports = router