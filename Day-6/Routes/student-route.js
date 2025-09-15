const express=require('express')
const { loginGet, loginPost } = require('../Controller/student-controller')
const router=express.Router()

router.get('/login',loginGet)
router.post('/login',loginPost)

module.exports=router