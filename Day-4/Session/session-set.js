// session helps the server remember who a user is
// The server creates a session object and gives the client a session ID (often kept inside a cookie).
// On each request, the browser sends this session ID, and the server looks up the session data
// Sessions are more secure and can store larger, sensitive information such as login state or shopping cart data

// WHERE DOES THIS STORE?
//The server needs a place to keep session data. This can be:
//Memory (default in express-session)
//1. Data stored in RAM
//2. Database (eX- MongoDB, MySQL)
//Another store (EX- Redis)


//HOW TO USE?
//app.use(session({ …options… }))

//options-
//1. secret
// Used to sign the cookie to prevent tampering.
// Ex- secret: "mySecretKey"

//2. name
// The name of the cookie that stores the session ID
// by Default = "connect.sid" or we can give any custom name

//3. cookie options
// -cookie.httpOnly:
// Default = true, Makes sure JS in the browser cannot read the cookie
// -cookie.secure:
// Ensures cookie is only sent over HTTPS
// -cookie.sameSite:
// Helps protect against CSRF attacks
// -cookie.maxAge:
// Time(in ms) before cookie expires

//Two types of cookies based on max-age
//a. Session Cookie
// No max-age or expires is set. The cookie only lasts until the browser is closed.
// Used for temporary sessions (ex- login sessions) no need to write any max-age, by default it sets session cookie

//b.Persistent Cookie

// expires is set. Survives even after browser restarts until the time is up

//4. resave
// resave: false, Do not save session if nothing has changed

//5. saveUninitialized
// saveUninitialized: false, Dont create empty sessions for visitors who havent write any data.
// Prevents storing useless sessions


//drawback of stateful..

//Scaling Problems:
//If we scale our app across multiple servers, each server needs shared session storage
// Without it, a user logged in and stored in Server A's memory and if their next request is to server B, doesn’t have that session in its memory.

//Security Concerns:
//If session IDs are stolen, attackers can hijack the session until it expires
//Longer session lifetimes increase risk.


// JWT vs express-session:

//JWT:
// Used in MERN stack, mobile apps.
// JWT is stateless, meaning the server does not store any user data.Instead, the user’s information is stored inside a signed token that the client keeps and sends with every request.
// This makes JWT perfect for MERN applications, mobile apps, and APIs, because it is fast, scalable, and works across different platforms.
// However, logout is harder with JWT because the server cannot directly “destroy” a token; it remains valid until it expires.

//session:
// Express - Session is stateful, meaning the server stores user session data and the browser only keeps a small session ID cookie.
// This makes logout and session handling very easy because the server can destroy the session anytime.
// Express - Session is ideal for traditional web apps


// | Feature                       |   JWT                                        |   Express-Session (Cookie Session)                  |
// | ----------------------------- | -------------------------------------------- | --------------------------------------------------- |
// |   Where user data is stored   | Inside the   token   (client-side)           | Inside **server memory/database**                   |
// |   How authentication works    | Client sends token every request             | Server checks session ID stored on server           |
// |   Scalability                 |   Very good (no server memory needed)        |   Hard when many users (server must store sessions) |
// |   Security                    | Good (if signed & using httpOnly cookies)    | Good (server controls data)                         |
// |   Logout                      | Hard (token remains valid until expiry)      | Easy (delete session from server)                   |
// |   Best for                    | APIs, mobile apps, MERN stack, microservices | Traditional websites, dashboards                    |
// |   State                       |   Stateless   (server stores nothing)        |   Stateful   (server stores session data)           |
// |   Speed                       | Fast                                         | Slightly slower                                     |
