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

//Why do we split controllers in Node.js/Express projects
//bcz the code becomes messy, hard to read, and difficult to maintain.
//Splitting controllers means moving the logic into a controllers/ folder, keeping routes only responsible for defining routes.
//This  makes the project scalable