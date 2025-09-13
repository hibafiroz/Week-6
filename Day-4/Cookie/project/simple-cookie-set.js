const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

//Import Express and cookie-parser.
// Use cookie-parser middleware - makes cookies available via req.cookies

app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome!</h2>
    <p>Open the console and run <code>document.cookie</code>.</p>
  `);
});
//Route / just sends HTML.
// User can check cookies with document.cookie in browser console.

// set a normal cookie (NOT HttpOnly)
app.get("/set-cookie", (req, res) => {
  res.cookie("userToken", "abc123", { path: "/" }); 
  res.send("Cookie set! Go to / and check document.cookie");
});
//Route /set-cookie sets a cookie called userToken with value abc123.
//if we go console and write document.cookie, it will show our cookie. so the user can see and change it which is insecure.

// with httpOnly
app.get("/set-cookie", (req, res) => {
  res.cookie("userToken", "abc123", { httpOnly: true, path: "/" }); 
  res.send("Cookie set! Go to / and check document.cookie");
});
//if we go console and write document.cookie, it wont show our cookie
// Options:
// httpOnly: true - JS (document.cookie) cannot access this cookie (safer, prevents XSS attacks)
// path: "/" - cookie is valid for the whole site