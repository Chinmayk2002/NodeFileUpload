const express = require("express");
const app = express();
const multer = require("multer");

//veiw engine
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (
      file.originalname.endsWith(".png") ||
      file.originalname.endsWith(".jpg") ||
      file.originalname.endsWith(".jpeg")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Please upload a PDF file"), false);
    }
    cb(undefined, true);
  },
});

// const upload = multer({
//   dest: "public/uploads",
//   limits: {
//     fileSize: 1000000, //Max file size in bytes
//   },
//   //File filter
//   fileFilter(req, file, cb) {
//     if (
//       file.originalname.endsWith(".png") ||
//       file.originalname.endsWith(".jpg") ||
//       file.originalname.endsWith(".jpeg")
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Please upload a PDF file"), false);
//     }

//     // console.log(file);

//     //call callback with error if there is an error
//     //cb(new Error("File must be a PDF"));

//     //for successful uploads call the callback with the file extension
//   },
// });

//GET /
app.get("/", (req, res) => {
  res.render("home");
});

//GET/ upload
app.get("/upload", (req, res) => {
  res.render("upload");
});
//POST /upload
app.post("/upload", upload.single("file"), async (req, res) => {
  res.render("images");
});

//GET /images
app.get("/images", async (req, res) => {
  //read all files in the uploads folder
  res.render("images");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
