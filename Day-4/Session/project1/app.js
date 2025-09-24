const express = require("express");
const session = require("express-session");
const app = express()
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `)
})

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username==="hiba" && password==="123"){
    req.session.user = username // store username in session
    res.send("Login successful!")
  }else{
    res.send("Invalid credentials")
  }
})

// profile route (protected)
app.get("/profile", (req,res)=>{
  if (req.session.user) {
    res.send(`Hello ${req.session.user}! <a href='/logout'>Logout</a>`);
  } else {
    res.send("Please login first.");
  }
});

// logout route
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out. <a href='/login'>Login again</a>");
  });
});

app.listen(3000,()=>console.log("http://localhost:3000"))
