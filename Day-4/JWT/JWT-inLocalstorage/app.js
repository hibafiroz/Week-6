const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

const app = express()
const secretKey = "hibaSecretKey"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Token generator function
function generateToken(user){
  return jwt.sign(user,secretKey,{ expiresIn: "1h" })
}

// Middleware to check token from headers
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(401).json({ message: "Token missing" })

  try{
    const decoded = jwt.verify(token,secretKey)
    req.user = decoded;
    next();
  }catch(err){
    return res.status(403).json({message:"Invalid token"});
  }
}

app.get("/login", (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const{username,password} = req.body

  // dummy user
  const user = { id: 1, username: "hiba", password: "12345" }

  if(username===user.username && password===user.password) {
    const token = generateToken({id: user.id,name: user.username})
    return res.json({token})
  }else{
    res.status(401).json({ message: "Invalid credentials" })
  }
})

app.get("/profile", authMiddleware,(req, res)=>{
  res.json({ message: `Welcome ${req.user.name}`,user: req.user })
})

app.listen(3000,()=>{
  console.log("Server running on http://localhost:3000/login");
});