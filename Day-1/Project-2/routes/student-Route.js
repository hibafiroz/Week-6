const express=require('express')
const router=express.Router()
const{register,studentPost,studentList,studentGet,course}=require('../controller/studentController')

router.get('/register',register)
router.get('/student',studentGet)
router.post('/studentList',studentPost)
router.get('/studentList',studentList)
router.get('/course',course)

module.exports=router