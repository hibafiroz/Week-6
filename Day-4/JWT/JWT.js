//why JWT?
//Its a secure way of transmitting data between client and server
//When a user logs in, the server verifies their credentials and crates a JWT.
//The client stores the token and sends it with each request.
//The server verifies the token to allow access to protected resources without keeping server-side sessions
//it contains a header, payload and signature

//Who creates the JWT(token)?
//The server side creates the token
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
// HS256 is a signing algorithm to sign token using a secret key
// That same key is used for both-
// Signing (when the server creates the token) and Verifying (when the server checks if the token is valid)
// it is symmetric means both sides use the same key

//how token create
//the server uses the payload and a secret key with HS256 to make a signature.
// Later the server verifies this signature with the same key—if it matches, the token is valid; if not, it’s fake.

// 2. Payload (yyyyy)
// it Contains the actual data (claims)
// Claims can be:

// a. Registered claims (standard ones):
// these are predefined keys`
// iss- Issuer (who issued the token)
// sub- Subject (the user the token refers to)
// exp- Expiration time
// iat- Issued at (when token was created)
// aud- Audience (who the token is intended for)

// b. Public Claims (custom but common):
//These are custom claims, but they are meant to be understood by everyone using that system
//ex:
{
  "id": 123,
  "name": "Hiba",
  "role": "admin",
  "exp": 1694192000
}

//c. Private Claims (custom, only for our app)
// These are custom claims that are only understood inside our own system.

//3. Signature (zzzzz)
//the server uses the payload and a secret key with HS256 to make a signature.
//verifies data hasnt been changed (security)
//Ensures the token wasnt tampered with.
hash( header + payload + secret_key )

// The signature is added to the token: header.payload.signature.

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