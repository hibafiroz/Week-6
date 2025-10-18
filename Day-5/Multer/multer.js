// Multer is a middleware used to handle file uploads. 
// It processes multipart/form-data, which is the encoding type used for uploading files through forms. 
// Multer saves the uploaded files either in memory or directly to a specified folder
// Without Multer, Express doesnt understand file uploads directly

//setting up:
//install npm i multer

//require it
const multer = require('multer')
const path = require('path')