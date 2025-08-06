const fs=require('fs').promises
const students=require('../data/students')
const path=require('path')
const filepath=path.join(__dirname,'../data/studentData.json')
//using Promise
 const writeData=(fileName,data)=>{
    return new Promise((res,rej)=>{
        fs.writeFile(fileName,data,(err)=>{
            if(err) return rej(error)
                res('Written Successfully')
        })
    })
 }

 //now we call as
 writeData('plain.txt',"Hello Good Morning").then().catch()
 //But we dont need to create custom Promise, node.js already providing (fs).promise



const registerGet=(req,res)=>{
    res.render('register')
}

const registerPost=async(req,res)=>{
    
    const {name,email}=req.body
    const data=await fs.readFile(filepath,'utf-8')
    const students=JSON.parse(data)
    const newStud={name,email}
    students.push(newStud)
    await fs.writeFile(filepath,JSON.stringify(students,null,2))
    console.log("Form Data:", req.body); 
    res.redirect('/studentList')
}

const studentListGet=async (req,res)=>{
    try{
        const data=await fs.readFile(filepath,'utf-8')
        const studentList=JSON.parse(data)
        res.render('studentList', { studentList }); 
    } catch (err) {
        console.error("Error reading student list:", err.message);
        res.status(500).send("Failed to load student list");
    }
}


// const studentListGet=(req,res)=>{
//     res.render('studentList',{students})
// }
const studentListPost=(req,res)=>{
    res.render('studentList',{students})
}

module.exports={
    registerGet,
    registerPost,
    studentListGet,
    studentListPost
}