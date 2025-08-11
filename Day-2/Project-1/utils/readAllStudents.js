const fs=require('fs').promises
const path=require('path')
const filepath=path.join(__dirname,'../data/studentData.json')

async function readAllStudents(){
    try{
    const data = await fs.readFile(filepath, 'utf-8');
    console.log('without parsed data',data)
    const students = JSON.parse(data);
    console.log('registered',students)
    return students
}catch(err){
    console.log('err')
    throw err
}
}

module.exports={readAllStudents}