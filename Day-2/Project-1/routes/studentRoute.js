const express=require('express')
const router=express.Router()

const {registerGet,registerPost, studentListGet,getSingleStudent}=require('../controller/studentController')

router.get('/register',registerGet)
router.post('/register',registerPost)
router.get('/studentList',studentListGet)
router.get('/studentDetail/:id',getSingleStudent)

module.exports=router