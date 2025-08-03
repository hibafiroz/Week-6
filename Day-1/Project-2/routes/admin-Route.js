const express=require('express')
const router=express.Router()
const{admin,studentListGet}=require('../controller/adminController')
const { getSingleStudent } = require('../controller/studentController')

router.get('/admin',admin)

router.get('/studentList',studentListGet)
router.get('/:id',getSingleStudent)
module.exports=router