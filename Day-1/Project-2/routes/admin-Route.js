const express=require('express')
const router=express.Router()
const{admin,studentListGet}=require('../controller/adminController')

router.get('/admin',admin)

router.get('/studentList',studentListGet)

module.exports=router