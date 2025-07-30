const studentForm=(req,res)=>{
    res.render('register')
}

const handleForm=(req,res)=>{
    const {name,age,className}=req.body
    res.send(`Student Registeration : ${name} <br> Age: ${age} <br> Class:${className}`)
}

module.exports={
    studentForm,
    handleForm
}