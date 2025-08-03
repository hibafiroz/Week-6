const students=require('../data/studentsData')
//making this array fetching from server in asynchronous way
// const fetchAllStudents=()=>{
//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             res(students)
//         },1000)
//     })
// }

// const studentGet=async(req,res)=>{
//     try{
//       const studentsList=await fetchAllStudents()
//       res.render('student',studentsList) 
//     }catch(err){
//       res.status(500).send('Failed to Fetch')  
//     }
// }

const admin=(req,res)=>{
    res.render('admin')
}

const studentListGet = (req, res) => {
  res.render('studentList', { students });
};


module.exports={
    admin,
    studentListGet, 
}
