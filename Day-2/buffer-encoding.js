// Binary data is used whenever we deal with raw 0s and 1s(not normal text)
// Node.js uses Buffer to manage this kind of data

//Buffer:
// A buffer is a temporary storage area in memory used to handle binary data (like files, streams, images).

const buf = Buffer.from('Hello')
console.log(buf);        //<Buffer 48 65 6c 6c 6f>
console.log(buf.toString()) //"Hello"

//Encoding:
//Encoding defines how that binary data is translated into text — the default is UTF-8,
//but Node also supports ASCII, hex, and base64

//its types:

// UTF-8 - Default, human-readable text, supports all characters
// ASCII - basic English characters (0–127)
// Base64 - Used for images, file upload, JWT tokens.
// Hex - represents in trwo digit hexadecimal value
// utf16le - Double-byte Unicode

//Encoding is needed when we deal with binary data like files,images,audio or data sent over a network.
// since raw binary isnt human-readable, encoding converts it into text formats we can store,transmit or display