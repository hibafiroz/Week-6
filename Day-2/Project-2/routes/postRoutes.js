const express=require('express')
const router=express.Router()

const {getForm,postForm,getPosts}=require('../controller/postController')

router.get('/add-post',getForm)
router.post('/add-post',postForm)
router.get('/posts',getPosts)

module.exports=router