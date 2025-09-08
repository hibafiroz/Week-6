const express=require('express')
const router=express.Router()

const {showForm,postForm,result}=require('../controller/feedback-controller')

router.get('/form',showForm)
router.post('/form',postForm)
router.get('/result',result)

module.exports=router