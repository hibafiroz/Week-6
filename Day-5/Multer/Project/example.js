const express=require('express')
const multer=require('multer')
const path=require('path')
const app=express()
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static('image'));
//storage 
const storage=multer.diskStorage({
    destination:'image',  //folder where uploaded files will be stored
    filename:(req,file,cb)=>{   //should be three arguments
        cb(null,Date.now()+path.extname(file.originalname)) //defines how to save the filename in folder
    }
})
//req - The request object so we can access req.body, user info etc...
//file - The uploaded file object containing info
//cb - Multer calls this to decide the final file name


//multer instance
const upload=multer({storage:storage})

//route
app.get('/add',(req,res)=>{
    res.render('add')
})

app.post('/add',upload.single('file'),(req,res)=>{  //'file' must match the name attribute of the <input> in HTML form. Multer uses it to know which uploaded file to process.
    if(req.file){
        const filePath='/'+req.file.filename
        res.render('upload',{filePath})
    }else{
        res.render('upload',{filePath:null})
    }
})
app.listen(3000,()=>{console.log('http://localhost:3000')})