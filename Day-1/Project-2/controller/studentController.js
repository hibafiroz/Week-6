const students=[{
    name:'hiba',
    email:'hiba@gmail.com',
    phone:1234567890,
    course:'Node.js & Express'
},
{
    name:'mehrin',
    email:'mehrin@gmail.com',
    phone:12789567890,
    course:'Node.js & Express'
},
{
    name:'mehrin',
    email:'mehrin@gmail.com',
    phone:12789567890,
    course:'Node.js & Express'
},
{
    name:'marsi',
    email:'mehrin@gmail.com',
    phone:12789567890,
    course:'Node.js & Express'
},
]

// const studentList = (req, res) => {
//     res.render('studentList', {students});
// };

//making this array fetching from server in asynchronous way
const fetchAllStudents=()=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(students)
        },1000)
    })
}

const studentList=async(req,res)=>{
    try{
      const studentsList=await fetchAllStudents()
      res.render('student',{studentsList}) 
    }catch(err){
      res.status(500).send('Failed to Fetch')  
    }
}

// const fetchSingleStudent=()=>{
//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             const student=students.find((s)=>{s.id===id})
//             res(student)
//         },1000)
//     })
// }

// const getSingleStuent=async(req,res)=>{
//     try{
//     const student=await fetchSingleStudent(req.params.id)
//     if(!student) return res.status(404).send('Student not found')
//         res.render('studentList',student)
// }catch(err){
//     return res.status(500).send('Something Went Wrong')
// }
// }

const studentPost=(req,res)=>{
    const {name,email,phone,course}=req.body;
    const newStud={id:students.length+1,name,email,phone,course}
    students.push(newStud)
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



//  const getSingleStuent=(req,res)=>{
//     const student=students.find(s=>{s.id===params.req.id})
//     if(!student) return res.status(404).send('Student not found')
//         res.render('studentList',student)
// }

module.exports={
    register,
    course,
    studentPost,
    studentGet,
    studentList,
}
