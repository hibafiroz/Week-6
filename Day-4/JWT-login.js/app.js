const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

// Secret key
const SECRET_KEY = 'my_secret_key'

// Use JSON parser
app.use(bodyParser.json())

// Static user
const USER = {
  username: 'admin',
  password: '12345'
};

// Login route: returns JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body

  if (username===USER.username&&password===USER.password){
    const payload = {username};
    const token=jwt.sign(payload,SECRET_KEY,{ expiresIn: '1h' });
    res.json({token});
  } else{
    res.status(401).json({ message:'Invalid credentials'});
  }
});


// Protected route: manually verifies token
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token){
    return res.status(401).json({ message: 'Access token missing' });
  }

  // verify token inline(not middleware)
  jwt.verify(token,SECRET_KEY,(err, user) =>{
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // If token is valid
    res.json({ message: `Hello, ${user.username}. You have access.` });
  });
});


app.get('/login',(req,res)=>{
    res.send('hi')
})

app.listen(PORT,()=>{
  console.log(`Server running at http://localhost:${PORT}`);
});
