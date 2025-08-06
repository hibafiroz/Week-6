const express=require('express')
const router=express.Router()

const {registerGet,registerPost, studentListGet,studentListPost}=require('../controller/studentController')

router.get('/register',registerGet)
router.post('/register',registerPost)
router.get('/studentList',studentListGet)
router.post('/studentList',studentListPost)

module.exports=router