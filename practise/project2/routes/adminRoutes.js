const express = require('express')
const { loginGet, loginPost } = require('../controller/adminController')
const router = express.Router()

router.get('/login', loginGet)
router.post('/login', loginPost)

module.exports=router