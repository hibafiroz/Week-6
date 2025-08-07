//setup
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');

//fs.readFile()
//reads the contents of a file asynchronously

fs.readFile(filePath,'utf8', (err, data) => {
  if (err) {
    console.error('Read Error:', err);
    return;
  }
  console.log('File content:', data);
});


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

//These are asynchronous so they don’t block the main thread

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


 //fs.readdir() 
 // Read contents of a folder and is used to list all files and directories inside a given folder

fs.readdir(path,[ options], callback)
// path: The folder you want to read
// options (optional):we can pass 'utf-8' to get filenames as strings or {writefiletype:true}
// callback: A function with parameters (err, files)
// err: Error object if something goes wrong
// files: Array of names

const fs = require('fs');

fs.readdir('./myFolder', (err, files) => {
    if (err) {
       return console.error('Error reading folder:',err);
    }
    console.log('Files and folders inside ./myFolder is ',files);
});
//output
[ 'file1.txt','file2.js','subFolder']

// { withFileTypes: true }
// This differentiate between files and folders

fs.readdir('./myFolder', { withFileTypes: true }, (err, items) => {
    if (err) throw err;
    items.forEach(item => {
        if (item.isFile()) {
            console.log('File:', item.name);
        } else if (item.isDirectory()) {
            console.log('Directory:', item.name);
        }
    });
});


// fs.mkdir()
// it is a built-in fs module used to create a new folder (directory) in your file system.
fs.mkdir(path,[ options], callback)

//simple creating folder
const fs = require('fs');

fs.mkdir('myFolder', (err) => {
  if(err) {
    console.error(err);
  }
  console.log('Folder created successfully!');
});
//creates a folder named myFolder in the current directory
//if the folder already exists, it throws an error like: file already exists

 //Create Nested Folders  Using { recursive: true }
 fs.mkdir('./a/b/c', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Nested folders created!');
});
// A folder a ,inside that, folder ,inside that, folder c

// it will throw an error if:
// a or b folders don’t already exist
// bcz Node.js by default does not create missing parent folders
 
//so thats why we use recursive:true , it will automatically creates folder if does not exist


//fs.rmdir()
//it is used to delete a folder
fs.rmdir(path, callback)
//but it has a limitation that It could only delete a folder if it was empty
// Assuming 'emptyFolder' has no files or subfolders

fs.rmdir('./emptyFolder', (err) => {
  if (err) throw err;
  console.log('Folder removed!');
});
//this works bcz it has no files
//if it has files, this shows error like: directory not empty

// so can Use fs.rm() instead
// The modern and preferred way is to use:

fs.rm(path, options, callback)
// Remove files or folders
// Delete non-empty folders

fs.rm(path, { recursive: true, force: true }, callback)
// recursive: true  allows deleting non-empty folders
// force: true  ignores err like "file not found"


//fs.rename()

//Renames a file
//OR moves it to a new location
fs.rename(oldPath, newPath, callback)
const fs = require('fs');

fs.rename('oldName.txt', 'newName.txt', (err) => {
  if (err) throw err;
  console.log('File renamed successfully!');
}); //this renames the file

fs.rename('notes.txt', './backup/notes.txt', (err) => {
  if (err) throw err;
  console.log('File moved to backup folder!');
});  //this moves the file to another location

//with async await
const fs = require('fs/promises');

async function renameFile() {
  try {
    await fs.rename('a.txt', 'b.txt');
    console.log('Renamed using promises');
  } catch (err) {
    console.error(err);
  }
}


//fs.unlink()

//Deletes a single file
fs.unlink('deleteMe.txt', (err) => {
  if (err) throw err;
  console.log('File deleted!');
});
