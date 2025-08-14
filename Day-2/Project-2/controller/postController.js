const fs=require('fs').promises
const path=require('path')
const filepath=path.join(__dirname,'../data/posts.json')
//const posts=[]
const getForm=(req,res)=>{
   res.render('add-Post')
}

const postForm=async(req,res)=>{
    const {name,title,content}=req.body
    const data=await fs.readFile(filepath,'utf-8')
    const postList=JSON.parse(data)
    const newPost={name,title,content}
    postList.push(newPost) 
    await fs.writeFile(filepath,JSON.stringify(postList,null,2))
    res.redirect('/posts')
}

const getPosts=async(req,res)=>{
     const data=await fs.readFile(filepath,'utf-8')
     const postList=JSON.parse(data)
     res.render('posts',{posts:postList})
}

module.exports={
    getForm,
    postForm,
    getPosts
}