const express=require('express')
const router=express.Router()
const{admin,studentList}=require('../controller/adminController')

router.get('/admin',admin)

router.get('/studentList',studentList)

module.exports=router