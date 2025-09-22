const express=require('express')
const { loginGet, loginPost, profile, studentPage } = require('../Controller/student-controller')
const { authMiddleware } = require('../utils/auth')
const router=express.Router()

router.get('/login',loginGet)
router.post('/login',loginPost)
router.get('/profile',authMiddleware,profile)
router.get('/studentPage',authMiddleware,studentPage)

module.exports=router