//a demo of cookiw working--
const express = require("express");
const cookieParser = require("cookie-parser");

const server = express();
server.use(cookieParser());

// Fake login (normally you'd check DB)
server.get("/login", (req, res) => {
  // set a cookie with username
  res.cookie("username", "Hiba", { httpOnly: true, maxAge: 60000 }); // 1 min
  res.send("You are logged in as Hiba!");
});

// Home page (needs cookie)
server.get("/home", (req, res) => {
  const user = req.cookies.username;
  if (user) {
    res.send(`Welcome to Home, ${user}!`);
  } else {
    res.send("Please login first.");
  }
});

// Reels page (also needs cookie)
server.get("/reels", (req, res) => {
  const user = req.cookies.username;
  if (user) {
    res.send(`Enjoy Reels, ${user}!`);
  } else {
    res.send("Please login first.");
  }
});

// Logout (clear cookie)
server.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.send("Logged out. Cookie cleared!");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});