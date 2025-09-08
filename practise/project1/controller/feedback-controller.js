// this is simple error handling with try catch, no middleware used


// const showForm=(req,res)=>{
//     res.render('form')
// }
// const list=[]
// const postForm=(req,res)=>{
//     const {name,feedback}=req.body;
//     if(!name||!feedback){
//         res.status(400).send('fill the box first')
//     }else{
//      list.push({name,feedback})
//      res.redirect('/result')
//     }
// }

// const result=(req,res)=>{
//     if(list.length===0) res.status(400).send('no feedback submitted yet')
//     res.render('result',{list})
// }

// module.exports={showForm,postForm,result}


//Using try-catch:

// const showForm=(req,res)=>{
//     try{
//       res.render('form')
//     }catch (err) {
//     res.status(500).send("error by catch");
//   }
    
// }
// const list=[]
// const postForm=(req,res)=>{
//     try{
//     const {name,feedback}=req.body;
//     if(!name||!feedback){
//         res.status(400).send('fill the box first')
//     }else{
//      list.push({name,feedback})
//      res.redirect('/result')
//     }
// }catch(err){
//     res.status(500).send('error handling with catch')
// }
// }

// const result=(req,res)=>{
//     try{
//     if(list.length===0) res.status(400).send('no feedback submitted yet')
//     res.render('result',{list})
//     }catch(err){
//         res.status(500).send('error handling with catch')
//     }
// }

// module.exports={showForm,postForm,result}


//Using Middleware:

// const showForm=(req,res,next)=>{
//     try{
//     res.render('form')
//     }catch(err){
//         next(err)
//     }
// }
// const list=[]
// const postForm=(req,res,next)=>{
//     try{
//     const {name,feedback}=req.body;
//     if(!name||!feedback){
//         const error = new Error("Name and feedback are required!")  //we need to create error obj everytime in controller instead we can make a separate error class
//         error.status = 400;  //if we wont give this it will default 500
//         return next(error);  //or throw error
//     }else{
//      list.push({name,feedback})
//      res.redirect('/result')
//     }
// }catch(err){
//    next(err)
// }
// }

// const result=(req,res,next)=>{
//     try{
//       if(list.length===0){
//         const err = new Error("No feedback submitted yet.")
//         err.status = 404;
//         return next(err)
//     }
//     res.render('result',{list})
//     }catch(err){
//         next(err)
//     }
// }

// module.exports={showForm,postForm,result}



//when theres a custom class:

const { NotFoundError } = require("../utils/errors")

const showForm=(req,res,next)=>{
    try{
    res.render('form')
    }catch(err){
        next(err)
    }
}
const list=[]
const postForm=(req,res,next)=>{
    try{
    const {name,feedback}=req.body;
    if(!name||!feedback){
        const error = new NotFoundError("Name and feedback are required!")  
        return next(error); 
    }else{
     list.push({name,feedback})
     res.redirect('/result')
    }
}catch(err){
   next(err)
}
}

const result=(req,res,next)=>{
    try{
      if(list.length===0){
        const err = new NotFoundError("No feedback submitted yet.")
        err.status = 404;
        return next(err)
    }
    res.render('result',{list})
    }catch(err){
        next(err)
    }
}

module.exports={showForm,postForm,result}