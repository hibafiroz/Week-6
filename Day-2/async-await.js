//1. readFile:
const fs = require('fs').promises

async function readData() {
  try {
    const data = await fs.readFile('example.txt', 'utf-8');
    console.log("File Content:", data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

readData()
//fs.readFile() returns a Promise so we can await it
//utf-8 converts buffer to normal string

//2. writeFile

async function writeData() {
  try {
    await fs.writeFile('example.txt', 'Hello Hiba!');
    console.log("File created and written successfully.");
  } catch (err) {
    console.error("Error writing file:", err)
  }
}

writeData();
//If file does not exist, it creates.
//if file exists, it overwrites

//3. appendFile

async function appendData() {
  try{
    await fs.appendFile('example.txt', '\nThis line was appended!');
    console.log("Data appended successfully.");
  }catch (err){
    console.error("Error appending file:", err)
  }
}

appendData();
//Adds new text at the end of the file
//wont overwrite the existing content


//Example:
const fs = require('fs').promises

async function fileOperations() {
  try {
    await fs.writeFile('data.txt', 'Initial content.')
    console.log("Write completed.")

    await fs.appendFile('data.txt','More content added.')
    console.log("Append completed.")

    const result = await fs.readFile('data.txt', 'utf-8')
    console.log("Read Result:", result)

  } catch (err) {
    console.error(err)
  }
}

fileOperations()