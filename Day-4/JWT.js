//What is JWT?

// A JWT stands for JSON Web Token is just a string that proves 'who you are'
// its made of 3 parts (separated by dots .)

// 1. Header

// Tells what algorithm is used (ex: HS256)
// Example:

{
  "alg": "HS256",
  "typ": "JWT"
}


// 2. Payload

// The actual data (claims) like user info.
// Example:

{
  "userId": 42,
  "username": "hiba",
  "role": "admin"
}


// 3. Signature
// A secret-key based signature so nobody can change the token.
// It’s like a seal of authenticity

//1. Login

// we open Instagram and enter username + password.
// Server checks if it’s correct in the database
// If correct → instead of storing your session on the server, it creates a JWT:
{
  "userId": 42,
  "username": "hiba",
  "role": "user"
}
// This info is encoded + signed -> becomes a JWT string

//2. Store the Token

// Instagram app saves this JWT:
// In localStorage (web app),
// in memory (mobile app)
// Or sometimes inside a secure cookie
// So we keep the token not the server.

//3. Make a Request

// Now we go to Reels page
// our app sends a request to the server with the JWT in the header:
Authorization: Bearer <your-JWT>

//4. Server Verifies

// The server looks at the JWT.
// It checks the signature with its secret key (like checking if the badge is real).
// If valid - it trusts the information inside

//Notice the server never saved our session.
// It only checks if our badge (JWT) is real every time

//why its useful?
// If Instagram has 1000 servers worldwide, we can hit any server.
// Each one can check your JWT without needing to share a central "session store"
