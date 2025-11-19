const fs = require("fs");
const path = require("path");

const pdfUpload = (req, res) => {
  // Path to where you store PDF info
  const filePath = path.join(__dirname, "../utils/pdfUploads.json");

  if (req.file) {
    // Read existing data
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Push new PDF details
    data.push({
      filename: req.file.filename,
      uploadTime: new Date().toISOString(),
    });

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.render("pdfUpload", { message: "PDF Uploaded Successfully" });
  }

  // If file not uploaded
  return res.render("pdfUpload", { message: "Upload Failed" });
};

module.exports = { pdfUpload };