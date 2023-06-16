const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "cn",
  api_key: "key",
  api_secret: "sec",
});

//instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,

  allowedFormats: ["jpg", "png"],
  params: {
    folder: "nodejs",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = storage;
