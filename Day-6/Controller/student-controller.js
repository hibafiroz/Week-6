const { generatestudentToken } = require("../utils/auth")
const {UnAuthorized, NotFoundError} = require("../utils/error")
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../utils/userList.json')
const userList = JSON.parse(fs.readFileSync(filePath, 'utf-8'))


//Login Page
const loginGet = (req, res) => {
    res.render('login')
}

// function cookieName() {
//     return `Student_Token_${}`
// }
const loginPost = (req, res, next) => {
    try{
        const { username, password } = req.body
        const student = userList.find(u => u.username === username && u.password === password)  //find will automatically give all other details of that person
        if (!student) {
            return next(new NotFoundError('No user Found'))
        }
        if (student.role !== 'student') {
            return next(new UnAuthorized('The Role is Mismatched!'))
        }
        res.cookie('Student_Token', generatestudentToken(student), { httpOnly: true, maxAge: 3600000 })
        res.redirect('/student/profile')
    } catch (err) {
        next(err)
    }
}


//Profile Page
const profile = (req, res) => {  
    console.log(req.user.photo)
    res.render('profile', {
        username: req.user.username,
        age: req.user.age,
        role: req.user.role,
        email:req.user.email,
        id: req.user.id,
        course: req.user.course,
        photo: req.user.photo
    })
}


//Student List
const studentList = (req, res) => {
   const currentUser = req.user;
  const students = userList.filter(u => u.role === 'student');

  res.render('studentList', {
      studentList: students,
      photo:currentUser.photo,
      currentUser
  });
};


//chat
const chat = (req, res) => {
    res.render('chat')
}

const groups = [
  { name: 'The Scholars Circle', image: '/images/groupChat2.jpeg' },
  { name: 'Unity Club', image: '/images/groupChat3.jpeg' },
  { name: 'Jumpstart Juniors', image: '/images/groupChat.jpeg' },
  { name: 'Math Club', image: '/images/groupChat4.jpeg' },
  { name: 'Art Avengers', image: '/images/groupChat5.jpeg' }
];

//Group List
const groupList = (req, res) => {
    const photo=req.user.photo
    res.render('groupList', {groups,photo})
}


//Group Chat
const groupChat = (req, res) => {
    const username = req.user.username
    const groupName = req.params.groupName
    const photo = req.user.photo
    res.render('groupChat', { username, groupName,photo })
}

module.exports = { loginGet, loginPost, profile, studentList , chat, groupList, groupChat }