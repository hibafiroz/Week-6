//setup
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');

//fs.readFile()
//reads the contents of a file asynchronously

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Read Error:', err);
    return;
  }
  console.log('File content:', data);
});
//'utf8' ensures the content is returned as a readable string instead of a buffer


//fs.writeFile()
//creates a new file or overwrites an existing one

fs.writeFile(filePath, 'Hello, this is my new file content!', (err) => {
  if (err) {
    console.error('Write Error:', err);
    return;
  }
  console.log('File written successfully!');
});


//fs.appendFile()
//Adds content to the end of a file

fs.appendFile(filePath, '\nThis line was added later!', (err) => {
  if (err) {
    console.error('Append Error:', err);
    return;
  }
  console.log('Content appended!');
});

//These are asynchronous, so they don’t block the main thread

// if we want synchronous versions--
// fs.readFileSync
// fs.writeFileSync
// fs.appendFileSync


//converting to json data
const data=[
    {id:1, name:'Hiba'}
]
 fs.writeFile('file.json',json.stringify(data,null,2),(err)=>{
    //handling err
 })


 