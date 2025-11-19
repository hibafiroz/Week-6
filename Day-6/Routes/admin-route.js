const express = require('express')
const router = express.Router()
const { loginGet, loginPost, profile2, studentList2, addStudentGet, deleteStudentPost, editStudentGet, editStudentPost, fileUpload, writeFile, userList, logoutAdminCookie } = require('../Controller/admin-controller')
const { adminAuthMiddleware, preventCache } = require('../utils/auth')


router.post('/fileUpload', upload.single('file'))
router.get('/login',preventCache, loginGet)
router.post('/login', loginPost)
router.get('/profile2', adminAuthMiddleware, profile2)
router.get('/logout', logoutAdminCookie)
router.get('/fileUpload', adminAuthMiddleware ,fileUpload)
router.get('/studentList2/addStudent', adminAuthMiddleware, addStudentGet)
router.post('/studentList2/addStudent', upload.single("photo"))
router.get('/studentList2', adminAuthMiddleware, studentList2)
router.post('/studentList2/deleteStudent/:id',adminAuthMiddleware, deleteStudentPost)
router.get('/studentList2/editStudent/:id', adminAuthMiddleware ,editStudentGet)
router.post('/studentList2/editStudent/:id',adminAuthMiddleware, editStudentPost)


module.exports = router