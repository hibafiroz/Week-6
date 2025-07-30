const express=require('express')
const router=express.Router()

const {studentForm,handleForm}=require('../controller/studentsController')

router.get('/student',studentForm)
router.post('/student',handleForm)

module.exports=router