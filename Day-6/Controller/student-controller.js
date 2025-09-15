const { tokenFunction, user } = require("../utils/auth")


const loginGet=(req,res)=>{
    res.render('login')
}

const loginPost=(req,res)=>{
    try{
     const {username,password}=req.body
    if(username===user[0].username&&password===user[0].password){
        res.cookie('Hiba',tokenFunction(),{httpOnly:true,maxAge:3600000})
        res.status(200).render('profile',{user})
    }else{
        res.status(401).json({ message: 'Invalid username or password' });
    }
}catch(err){
    res.status(400).send('Something went wrong')
}
}


module.exports={loginGet,loginPost}