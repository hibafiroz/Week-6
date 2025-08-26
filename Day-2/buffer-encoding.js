//Buffer:

// a Buffer is a temporary memory space for storing raw binary data (like bytes).
// Needed because JavaScript normally only handles strings (text), not raw binary.
// Common when working with files, streams etc

const buf = Buffer.from('Hello'); // default = utf-8
console.log(buf);        // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()) // "Hello"

//Here 48 65 6c 6c 6f are hex values of ASCII codes for "Hello"

//Encoding:

//Encoding defines how that binary data is translated into text — the default is UTF-8,
//but Node also supports ASCII, hex, and base64

//its types:

// UTF-8 - (default) supports almost all characters worldwide
// ASCII - basic English characters (0–127)
// Base64 - represents binary data as ASCII text, often used for transmitting files or images in text-based protocols.
// Hex - represents each byte as a two-digit hexadecimal value

const buff = Buffer.from('Hello World','utf-8')

console.log(buff.toString('hex'));     // 48656c6c6f20576f726c64
console.log(buff.toString('base64'));  // SGVsbG8gV29ybGQ=

//Creating buffer:

// From string
const buf1 = Buffer.from('Hi', 'utf-8')

// Allocate fixed size (filled with zeros)
const buf2 = Buffer.alloc(10)

// From array of bytes
const buf3 = Buffer.from([72, 105])  //Hi


//Reading and writing buffer:

const buf = Buffer.alloc(5);
buf.write('Hello');
console.log(buf.toString()); //Hello


//use case of binary data
//Encoding is needed when we deal with binary data like files,images,audio or data sent over a network. since raw binary isnt human-readable, encoding converts it into text formats we can store,transmit or display
//For ex a file read into a Buffer can be encoded as UTF-8 for text, base64 for safely transmitting an image in JSON or HTML or hex when representing data in debugging or cryptography