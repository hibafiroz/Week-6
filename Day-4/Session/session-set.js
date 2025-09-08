// A session stores data on the server-side.
// The server creates a session object and gives the client a session ID (often kept inside a cookie). 
// On each request, the browser sends this session ID, and the server looks up the session data
// Sessions are more secure and can store larger, sensitive information such as login state or shopping cart data

// WHERE DOES THIS STORE?
//The server needs a place to keep session data. This can be:
//Memory (default in express-session)
//Data stored in RAM
//Fast but not good for production (lost when server restarts)

//Database (eX- MongoDB, MySQL)
//Sessions stored safely in a DB and can persist across server restarts

//Another store (EX- Redis)
//Used for high-performance apps, Better scaling when multiple servers are used.


//HOW TO CREATE?

//We use express-session middleware.
//Why express-session is used? Bcz HTTP is stateless So it forgets the user. express-session lets the server remember the user

// Steps:
// 1. Creates session data
// When we use express-session it creates a session object for each user
// Example: after login, we can store req.session.username = "Hiba"
// This data is kept on the server

// 2. Manage
// express-session helps manage session lifecycle like
// Saving session data
// Updating session values
// Destroying session on logout

// 3. Automatically sets a session ID cookie
// we dont need to manually create cookies
// express-session will generate a unique session ID for each user

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

//4. resave
// resave: false, Do not save session if nothing has changed

//5. saveUninitialized
// saveUninitialized: false, Dont create empty sessions for visitors who havent write any data.
// Prevents storing useless sessions