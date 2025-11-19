const express = require('express')
const { loginGet, loginPost, profile, studentList, groupList, groupChat, editStudent2Get, editStudent2Post, studentPage, logoutStudentCookie } = require('../Controller/student-controller')
const { studentAuthMiddleware, preventCache } = require('../utils/auth')
const router = express.Router()

//Routes
router.get('/login', preventCache ,loginGet)
router.post('/login', loginPost)
router.get('/profile', studentAuthMiddleware, profile)
router.get('/logout', logoutStudentCookie)
router.get('/studentList', studentAuthMiddleware, studentList)
router.get('/groupList',studentAuthMiddleware, groupList)
router.get('/groupChat/:groupName', studentAuthMiddleware, groupChat)
router.get('/studentPage', studentAuthMiddleware, studentPage)
router.get('/editStudent2', studentAuthMiddleware, editStudent2Get)
router.post('/editStudent2',studentAuthMiddleware,editStudent2Post)

module.exports = router