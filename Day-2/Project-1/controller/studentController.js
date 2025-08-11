const fs=require('fs').promises
const path=require('path')
const { NotFoundError } = require('../utils/error')
const { readAllStudents } = require('../utils/readAllStudents')
const filepath=path.join(__dirname,'../data/studentData.json')

const registerGet=(req,res)=>{
    res.render('register')
}

const registerPost=async(req,res,next)=>{
    const {name,email}=req.body   //Destructures name and email from the form submission
    // const data=await fs.readFile(filepath,'utf-8')
    // const students=JSON.parse(data)
    const students=await readAllStudents()
    const newStud={       //Creates a new student object id: generated using Date.now() and name and email: from the form
        id:Date.now(),
        name,
        email
    }
     students.push(newStud)
    await fs.writeFile(filepath,JSON.stringify(students,null,2))   //JSON look pretty with 2-space indentation and await ensures writing is complete before redirecting
    res.redirect('/studentList')
}

const studentListGet=async (req,res,next)=>{
    try{
        const data=await fs.readFile(filepath,'utf-8')
        const studentList=JSON.parse(data)
        res.render('studentList', { students:studentList}); 
    } catch (err) {
        next(err)
    }
}

const fetchSingleStudent = async(id) => {
    const data = await fs.readFile(filepath, 'utf-8');
    const students = JSON.parse(data);
    return students.find(s => s.id === parseInt(id));
}


const getSingleStudent = async(req, res, next) => {
    const student = await fetchSingleStudent(req.params.id);
    if (!student) {
        const err = new NotFoundError('student not found');
        return next(err);
    }
    res.render('studentDetail', { student });
}

module.exports={
    registerGet,
    registerPost,
    studentListGet,
    getSingleStudent
}


//using Promise
//  const writeData=(fileName,data)=>{
//     return new Promise((res,rej)=>{
//         fs.writeFile(fileName,data,(err)=>{
//             if(err) return rej(error)
//                 res('Written Successfully')
//         })
//     })
//  }

 //now we call as
 //writeData('plain.txt',"Hello Good Morning").then().catch()
 //But we dont need to create custom Promise, node.js already providing (fs).promise
