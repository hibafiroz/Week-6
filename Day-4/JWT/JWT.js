//why JWT?
//The server does not need to remember sessions, the token is stored on the browseer
// On each request the server juz verifies the tokens signature, no session DB needed

// User logs in- server verifies
// Server creates token- sends it to client.
// Client stores token
// Client makes requests- token goes with request
// Server verifies token.

//Who creates the JWT(token)?
//The server side creates the token
//The server sends the token to the user browser or frontend
//The browser can store it in two main ways:
// 1. Cookies: automatically sent with each request.
// 2. Local Storage/JSON object: frontend manually attaches it in requests.

//How the token sent back to the server?
// When the browser makes request to the server again
// The request carries the token in either:
// Cookies: browser auto-includes it
// Authorization Header: "Authorization: Bearer <token>"


//A JWT looks like this:
xxxxx.yyyyy.zzzzz


//It has 3 parts, separated by dots (.)
// 1. Header (xxxxx)
// Contains metadata about the token.
// Specifies the signing algorithm (HS256 or RS256) and the token type(JWT)
//ex: 
{
  "alg": "HS256",
  "typ": "JWT"
}
//HS256: 
// One secret key is used. (key is a a secret string)
// That same key is used for both-
// Signing (when the server creates the token) and Verifying (when the server checks if the token is valid)
// it is symmetric means both sides use the same key

//When the server creates a token, it takes:
// the payload plus this secret key and runs them through the HS256 algorithm to make a signature
// Later when someone sends the token back, the server uses the same secret key to check the signature
// if the signature matches token is valid. if not token is fake

// 2. Payload (yyyyy)
// it Contains the actual data (claims)
// Claims can be:

// a. Registered claims (standard ones):
// these are predefined keys that are recommended by JWT specification
// iss- Issuer (who issued the token)
// sub- Subject (the user the token refers to)
// exp- Expiration time
// iat- Issued at (when token was created)
// aud- Audience (who the token is intended for)

// b. Public Claims (custom but common):
//These are custom claims, but they are meant to be understood by everyone using that system
//if multiple systems agree on certain claims, they all understand these keys.
//ex:
{
  "id": 123,
  "name": "Hiba",
  "role": "admin",
  "exp": 1694192000
}

//c. Private Claims (custom, only for our app)
// These are custom claims that are only understood inside our own system.
// Ex:
{ "commonId": "923" }
//Only my app knows what commonId means, it wont make sense to others

//3. Signature (zzzzz)
//verifies data hasnt been changed (security)
//Ensures the token wasnt tampered with.
hash( header + payload + secret_key )
//The server uses the secret key to sign it
//So if someone tries to edit the payload the signature wont match anymore and the server rejects it


//JWT creation:

//first install jsonwebtoken, then require it
const jwt = require('jsonwebtoken');

// Create a token
jwt.sign(payload,secretKey,options)
//Payload- The data you want to put inside the token.
//Secret Ke- A secret string that the server uses to sign the token
//Options- Extra settings like expiry time

const jwt = require("jsonwebtoken")

const payload = { id: 101, name: "Hiba" }
const secretKey = "mySuperSecret123"
const options = { expiresIn: "1h" }

const token = jwt.sign(payload, secretKey, options)

console.log(token)

//Token Verification:
//syntax-
jwt.verify(token, secretKey, [options], [callback])
//token- the JWT string (header.payload.signature) we wanna verify
//secreteKey- if the JWT uses HS256-pass the secret key.
//if it uses RS256- pass the public key.
//options- maxAge,issuer,algorithms,audience
//callBack-  if we provide a callback- async style. if not, it throws an error when invalid (sync style)