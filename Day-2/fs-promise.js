const fs = require('fs').promises;

async function run(){
  try{
    // Write a file
    await fs.promises.writeFile('example.txt','Hello, this is the first line');
    console.log('File written successfully')

    // Append to the file
    await fs.promises.appendFile('example.txt','This line was appended');
    console.log('File appended successfully')

    // Read the file
    const data = await fs.promises.readFile('example.txt','utf-8');
    console.log('File contents:\n'+ data)

  } catch (err) {
    console.error('Error:',err.message)
  }
}

run()

//Using await fs.promises.method(...) means no need to wrap fs.promises separately