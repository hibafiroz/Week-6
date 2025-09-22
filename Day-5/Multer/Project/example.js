const express=require('express')
const multer=require('multer')
const path=require('path')
const app=express()

//storage 
const storage=multer.diskStorage({
    destination:'image',
    filename:(req,file,cb)=>{   //should be three arguments
        cb(null,Date.now()+path.extname(file.originalname)) //defines how to save the filename in our folder
    }
})

//multer instance
const upload=multer({storage:storage})

app.get('/add',(req,res)=>{
    res.send('entered')
})

app.post('/add',upload.single('file'),(req,res)=>{   //'file' is given to enter in post 
    res.send('File uploaded successfully')
})
app.listen(3000,()=>{console.log('http://localhost:3000/add')})


