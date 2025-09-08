const students = require('../data/studentsData')
const { NotFoundError } = require('../utils/errors')

// const studentList = (req, res) => {
//     res.render('studentList', {students});
// };

//making this array fetching from server in asynchronous way
const fetchAllStudents = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(students)
        }, 1000)
    })
}

const studentGet = (req, res) => {
    console.log('student page entered')
    res.render('studentz')
}

const studentList = async (req, res,next) => {
    try {
        const studentsList = await fetchAllStudents()
        res.render('studentList', { students: studentsList })
    } catch (error) {
       return next(error)
        //res.status(500).send('Failed to Fetch')
    }
}

// const getSingleStudent=(req,res)=>{
//     const student=students.find(s=>{s.id===params.req.id})
//     if(!student) return res.status(404).send('Student not found')
//         res.render('studentList/:id',student)
// }

const fetchSingleStudent = (id) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const student = students.find((s) => s.id === parseInt(id))
            res(student)
        }, 1000)
    })
}

const getSingleStudent = async (req, res,next) => {
    try {
       const student = await fetchSingleStudent(req.params.id)
       if (!student) {
        console.log('getSingle student page entered')
            // next(err...content)
          return next(new NotFoundError('student not found'))
          //should write return or else it will pass to middleware after all the execution of this program
        //   throw(err) //can use throw() instead next() but only works if we're inside an async and the error is caught by a try-catch that calls next(err) inside the catch and no need to write return.
       }
        // return res.status(404).send('Student not found')
      return res.render('studentDetail', { student })
 } catch (err) {
       return next(err)  //err passing to middlewaree (let middleware handle the response)
    }
    // if student is not found- throw a NotFoundError and pass it to middleware via next(err)
    // if any other error(like DataBase error) occurs - pass that too using next(err)
}

//throw is javascript specific so there must be someone to handle it- like try catch or else app will crash-- if it is in asynchrornous
//but in synchronous-- express will handle throw without even try catch -like 500 err..
//next() is express specific and it will be handled by express itself showing 404 error..

const studentPost = (req, res) => {
    const { name, email, phone, course } = req.body;
    const newStud = { id: students.length + 1, name, email, phone, course }
    students.push(newStud)
    res.redirect('/')
}


const course = (req, res) => {
    res.render('course')
}

const register = (req, res) => {
    res.render('register')
}

///how controller sends eror to middleware
//next(err) Passes any error to the middleware



module.exports = {
    register,
    course,
    studentPost,
    studentGet,
    studentList,
    getSingleStudent
}
