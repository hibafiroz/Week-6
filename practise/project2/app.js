const express = require('express')
const adminroute = require('./routes/adminRoutes')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/',adminroute)

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3011,()=>{console.log('http://localhost:3011/login')})