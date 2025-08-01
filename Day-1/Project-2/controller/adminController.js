const students=[]

const admin=(req,res)=>{
    res.render('admin')
}

const studentList=(req,res)=>{
    res.render('studentList',{students})
}

module.exports={
    admin,
    studentList
}