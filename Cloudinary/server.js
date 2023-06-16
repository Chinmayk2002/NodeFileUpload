const express = require("express");
const app = express();
const storage = require("./config/cloudinary");
const multer = require("multer");
const Gallery = require("./model/Gallery");
const connectDB = require("./config/dbConnect");
connectDB();

//veiw engine
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

//configure multer
const upload = multer({ storage });

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
  const file = req.file.path;

  try {
    const pic = await Gallery.create({ name: file });
    console.log(pic);
    res.render("images");
  } catch (error) {
    res.send("Something went wrong");
  }
});

//GET /images
app.get("/images", async (req, res) => {
  try {
    const images = await Gallery.find();
    console.log(images);
    res.render("images", { images });
  } catch (error) {
    res.send("Something went wrong");
  }
});
``;
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
