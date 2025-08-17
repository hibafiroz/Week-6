const {exec}=require('child_process')

exec('node -v',(error,stderr,stdout)=>{
    if(error){
        return console.log(`error ${error}`)
    }else if(stderr){
       return console.log(`stderr {stderr}`)
    }else{
        return console.log(`version is ${stdout}`)
    }
})