const userList=[]
const loginGet = (req, res) => {
    res.render('login')
}
const loginPost = (req, res) => {
    const { username, password } = req.body
    userList.push({
        username,
        password
    })
    res.redirect('/')
}

module.exports = {
    loginGet, loginPost
}