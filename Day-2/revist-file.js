const fs = require('fs').promises

async function fileOperations(){
  try{
    // Write to a file
    await fs.writeFile('example.txt','Hello this is the first line')
    console.log('File written successfully.');

    // Append to the file
    await fs.appendFile('example.txt','This line was appended')
    console.log('File appended successfully.')

    // Read the file
    const data = await fs.readFile('example.txt','utf-8')
    console.log('File contents:\n',data)

  }catch(err){
    console.error('Error:',err)
  }
}

fileOperations()
