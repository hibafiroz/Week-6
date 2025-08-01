const express=require('express')
const router=express.Router()
const{register,studentGet,studentPost,course}=require('../controller/studentController')
router.get('/register',register)
router.post('/register',studentPost)

router.get('/student',studentGet)

router.get('/course',course)

module.exports=router