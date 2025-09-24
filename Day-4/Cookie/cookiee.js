//Why cookie is introduced?
//HTTP is stateless - every request/response is independent(the server can’t remember users)


//COOKIE:
// A cookie is small data stored on the client-side browser in the form of a key-value pair.
// it is sent with every request to the server
// they are limited in size (<= 4KB) and 
// are less secure since they can be modified by the client


//WHO CREATES COOKIES?
//Cookies are stored in the browser(client-side) but can be set by either server or client.
// 1. Server-side cookies
// Created by the server and sent in the HTTP response header
// Example:
// Set-Cookie: sessionId=abc123; HttpOnly
// Browser saves this and sends it back automatically with every request

// 2. Client-side cookies
// Created directly by the browser using JavaScript.
// Example:
// document.cookie = "theme=dark; path=/"
// These are less secure, bcz JavaScript can read andwrite them


//is it safe to store in cookie? No
//bcz Users can view and modify cookies and document.cookie lets JavaScript read cookies and Plain text transmission(if no HTTPS)
//solutions for security

//COOKIE ATTRIBUTES: (server side cookie)
// 1. Secure (can create from JS client side)
// Means the cookie will only be sent over HTTPS(not HTTP)
// Prevents attackers from sniffing cookies in plain text.
// Ex: Set-Cookie: sessionId=abc123; Secure

// 2. HttpOnly(if its http) (only by server)
// Means JS cannot read the cookie (document.cookie wont show it)
// Only the server can access it when the browser sends it with requests
// this protects against XSS (Cross-Site Scripting) attacks
// Ex: Set-Cookie: sessionId=abc123; HttpOnly

// 3. SameSite (can create from JS client side)
// Controls whether cookies are sent on cross-site requests
//there are 3 values--
// Strict - Cookie sent only for requests from the same site (Good security but sometimes breaks usability).
// Lax - Cookie sent for same site + safe cross-site requests(like clicking a link). This is the default in most browsers.
// None - Cookie is sent everywhere (same-site + cross-site).
// Must be used with Secure (only over HTTPS).
// This is how third-party cookies (like ad trackers) work.


//WHY COOKIE-PARSER?
// By default, Express doesnt parse cookies from the request headers.
// Cookies are just sent as a long string in req.headers.cookie.
// Ex: "theme=dark; sessionId=abc123; loggedIn=true"
// we have to manually split by ; and parse key-value pairs
// cookie-parser middleware does that work for us.
//It also supports signed cookies


//XSS = CROSS-SITE SCRIPTING ATTACK:
// XSS is a security vulnerability where attackers inject malicious javaScript into a website
// If the site does not sanitize user input, the attackers script runs in other users browsers.
// Ex: <input type="text" value="<script>alert('Hacked!')</script>">
// If the website doesn’t sanitize input, this script runs, attacker can steal cookies, tokens, or manipulate the page.
// thats why we use cookies with HttpOnly: true, so even if XSS runs, attackers cant read sensitive cookies


// | Feature       | Cookie (Client-side)     | Session (Server-side)              |
// | ------------- | ------------------------ | ---------------------------------- |
// |   Storage     | Browser                  | Server                             |
// |   Data type   | Small info (4KB)         | Large/complex data                 |
// |   Security    | Less secure (modifiable) | More secure (hidden from client)   |
// |   Lifetime    | Until expiry set         | Until logout/timeout/browser close |
// |   Best use    | Preferences, remember-me | Authentication, shopping cart      |



//Types of authentication approches:

//1. Statefull Authentication
//it is Called stateful bcz the server keeps the state (session data) after we log in

//Means the server keeps session data for each user. When we log in, 
//the server creates a session object and stores it, while the browser just holds a session ID in a cookie. 
// Each request the server checks that ID and fetches our session.

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



//2. Stateless Authentication (JWT)

// it is called stateless bcz the server does not keep any session data
//instead, the server gives us a token and we must show it every time

//Means the server doesn’t keep sessions. Instead it gives the client a signed token(like a JWT) that contains user info.
//On every request, the client sends the token, and the server only verifies its signature.

// 1. Login
// we enter username + password.
// Server checks in the database.
// If correct → server creates a JWT token (JSON Web Token).
// This token contains our info (userId, role, expiry time) in a safe and signed way

// 2. Token sent to Client
// Server gives the token to the browser.
// Browser can store it in:
// A cookie (safe option)
// Or localStorage (less safe)

// 3. Next Requests
// When we visit /profile, our browser sends the token with the request:
//Authorization: Bearer <token_here>

// Server checks if token is valid (signature + expiry).
// If yes → server knows who they are, without storing anything

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