// A cookie is small data stored on the client-side browser in the form of a key-value pair.
// it is sent with every request to the server
//  Cookies are usually used for things like remember-me options or storing a small identifier. 
// they are limited in size (<= 4KB) and 
// are less secure since they can be modified by the client


// A session stores data on the server-side.
// The server creates a session object and usually gives the client a session ID (often kept inside a cookie). 
// On each request, the browser sends this session ID, and the server looks up the session data
// Sessions are more secure and can store larger, sensitive information such as login state or shopping cart data

// | Feature       | Cookie (Client-side)     | Session (Server-side)              |
// | ------------- | ------------------------ | ---------------------------------- |
// | **Storage**   | Browser                  | Server                             |
// | **Data type** | Small info (4KB)         | Large/complex data                 |
// | **Security**  | Less secure (modifiable) | More secure (hidden from client)   |
// | **Lifetime**  | Until expiry set         | Until logout/timeout/browser close |
// | **Best use**  | Preferences, remember-me | Authentication, shopping cart      |



//Types of authentication approches:

//1. Statefull Authentication
//it is Called stateful bcz the server keeps the state (session data) after we log in
//That means the server remembers you until you log out or your session expires

//1. Login
// we type username + password
// Server checks them in the database
// if correct, server creates a session objct
session = {
  id: "abc123xyz",   // unique session ID
  userId: 42,        // user id
  role: "admin",
  cart: [1, 4, 6]    // maybe your shopping cart
}

//2. Session ID -> Cookie

// Server sends a session ID to browser and stores in cookie
// ex:
Set-Cookie: connect.sid=abc123xyz; HttpOnly; Secure
// our browser stores it automatically

//3. Next Requests
// When we visit /profile, the browser automatically sends the cookie back:
// connect.sid=abc123xyz
// Server looks up that ID and finds our session obj. now it knows who we are.

//4. Expiration
// Sessions expire after some time like 30min
// When expired, server deletes it and we must log in again

//advantage: its Secure- Only session ID is in the browser, real data is safe on the server.
//Easy logout: Server can just delete the session

//disadvantage: Server memory problem: If 1M users log in, server must keep 1M sessions
// Multiple servers issue: If our request goes to another server, that server may not have our session
//To fix this, we need--
// Sticky sessions (always send us to the same server)
// Or a shared store (like Redis) so all servers can see our sessions


//in short:
//Server creates a session (stores data in memory/DB).
// Server gives the client a session ID.
// That session ID is saved in the browser as a cookie.
// On every request, the browser automatically sends that cookie back → server looks it up.
//So in session-based auth, the cookie is just a carrier of the session ID.


//2. Stateless Authentication (JWT)

// it is called stateless bcz the server does not keep any session data
//instead, the server gives us a token and we must show it every time

// 1. Login
// we enter username + password.
// Server checks in the database.
// If correct → server creates a JWT token (JSON Web Token).
// Example (looks like a long random string):
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// This token contains our info (userId, role, expiry time) in a safe, signed way.

// 2. Token sent to Client
// Server gives the token to our browser.
// Browser can store it in:
// A cookie (safe option)
// Or localStorage (less safe)

// 3. Next Requests
// When we visit /profile, our browser sends the token with the request:
//Authorization: Bearer <token_here>

// Server checks if token is valid (signature + expiry).
// If yes → server knows who we are, without storing anything.

// 4. Expiration
// Token usually expires fast like 10–15 min
// When expired, we log in again (or use a refresh token to get a new one)

// advantage:Works well when we have many servers. how?
//Server gives us a token once.
// The token itself has all the info (user id,role,expiry)
// On the next request, whether it goes to any server, the server just checks the token- done 
// No need to remember anything on the server side

//Token can carry info like role, permissions (so fewer DB calls).

//disadvantage:its hard to logout (bcz token stays valid until it expires)
//if token is stolen, attacker can use it

//in short:
//Server creates a JWT token with user data.
// Client stores this token → often in a cookie or localStorage.
// On each request, the client sends the token → server verifies it
//Here too, a cookie can be used (but not required). it’s just one option to store the JWT


//Using cookie-parser:
//To use cookies in Express, we have to install the cookie-parser package, it is a middleware that is used to parse cookies from the incoming request

//Without cookie-parser
// If we dont use cookie-parser, then if the browser sends:
// Cookie: username=Hiba
//we have to manually parse that string "username=Hiba" ourself in every route becomes messy

////1. npm install cookie-parser

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// use cookie-parser
app.use(cookieParser());

//res.cookie -> Used by the server to SET a cookie in the browser
//req.Cookie -> Used by the server to READ cookies that the browser sends back.

//2. Set a Cookie

// We use res.cookie(name, value, options)

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Hiba", { maxAge: 60000 }); // expires in 1 minute
  res.send("Cookie has been set!");
});
//now Visiting http://localhost:3000/set-cookie,  browser will now save a cookie: username=Hiba.


//3. Read a Cookie

// read it using req.cookies

app.get("/get-cookie", (req, res) => {
  const user = req.cookies.username; // read the cookie
  res.send(`Hello ${user || "Guest"}!`);
});


//now Visiting http://localhost:3000/get-cookie  --
//if the cookie exists - Hello Hiba!
//if not - Hello Guest!

//4. Clear a Cookie

//We remove it with res.clearCookie(name).

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie cleared!");
});

// Visiting http://localhost:3000/clear-cookie

//Now if we go back to /get-cookie, it will say Hello Guest!.


