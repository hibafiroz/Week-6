const studentPost=(req,res)=>{
    let id=1
    const {name,email,number,course}=req.body
    students.push({id:id++,name,email,number,course})
    res.redirect('/studentList')
}

const studentGet=(req,res)=>{
    res.render('student')
}

const course=(req,res)=>{
    res.render('course')
}

const register=(req,res)=>{
    res.render('register')
}

module.exports={
    register,
    studentGet,
    course,
    studentPost
}