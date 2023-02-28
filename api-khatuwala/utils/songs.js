import multer from "multer";
import fs from "fs";
import path from "path";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "./public/songImg";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
filename: function (req, file, cb) {
    cb(null,   Date.now() + "_"+file.originalname)
  }
});

var songImg = multer({ storage: storage }).fields([
  {
    name: "audio",
  },
  {
    name: "files",
  },
]);

//   let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//       let extension = getFileExtention(file.mimetype);
//       cb(null, file.fieldname + "-" + Date.now() + "." + extension);
//     },
//   });
//   const upload = multer({ storage: storage });

export default songImg;
