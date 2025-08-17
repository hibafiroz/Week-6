const express=require('express')
const router=express.Router()
const{register,studentPost,studentList,studentGet,course,getSingleStudent}=require('../controller/studentController')

router.get('/register',register)
router.get('/studentz',studentGet)
router.post('/studentList',studentPost)
router.get('/studentList',studentList)
router.get('/course',course)
router.get('/studentDetail/:id',getSingleStudent)

module.exports=router