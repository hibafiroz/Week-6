const express=require('express')
const { loginGet, loginPost, profile } = require('../Controller/student-controller')
const { authMiddleware } = require('../utils/auth')
const router=express.Router()
const fs=require('fs')
const path=require('path')
const filePath=path.join(__dirname,'../utils/bulletins.json')


router.get('/login',loginGet)
router.post('/login',loginPost)
router.get('/profile',authMiddleware,profile)

router.get('/studentPage',authMiddleware,(req,res)=>{
    const data = fs.readFileSync(filePath, 'utf-8');
    files = JSON.parse(data)
    res.render('studentPage',{files})
})
module.exports=router