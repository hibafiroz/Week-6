const { Duplicates } = require('../utils/error')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.path.includes("fileUpload")) {
      cb(null, 'public/uploads');  // folder for admin files 
    } else if (req.path.includes("addStudent")) {
      cb(null, 'public/photos');   // folder for student files
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Choose JSON file based on route
function getfile(req) {
  if (req.path.includes("fileUpload")) {
    return path.join(__dirname, "../utils/bulletins.json");
  }
}

 const photoUpload=(req, res, next) => {
  const { username, age, email, course, role } = req.body;
  const photo = req.file? req.file.filename:null         //Multer stores uploaded files in req.file (for single file) or req.files (for multiple). not in req.body
  const user = { id: Number(String(Date.now()).slice(-3)), username, password: '123456', age, email, role, course, photo }
  if (userList.some(u=>u.username===user.username)) {
    return next(new Duplicates('User Already Exist'))
  }
  userList.push(user)
  writeFile()
    res.redirect("/admin/studentList2");
}
  
const imageUpload=(req, res) => {
  const filePath = getfile(req);

  if (req.file) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    data.push({
      filename: req.file.filename,
      uploadTime: new Date().toISOString()
    });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.render('fileUpload', { message: 'File Uploaded Successfully' });
  } else {
    res.render('fileUpload', { message: 'Upload Failed' });
  }
}

module.exports={imageUpload,photoUpload,upload}