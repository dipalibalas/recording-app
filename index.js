const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    let dir = `./media/${file.originalname}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, "./media");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  onError: (err, next) => {
    console.log(err);
  },
});

//const storage = multer.diskStorage({​
//   destination:(req,file,cb)=>{​
//  let dir =`./media/${file.originalname}​`
//   if(!fs.existsSync(dir)){​
//         fs.mkdirSync(dir,{​recursive:true}​)
//   }​
//   cb(null,dir)
//   }​,
//   filename:(req,file,cb)=>{​
//   cb(null,file.originalname)
//   }​
//}​)

//const upload = multer({​storage,onError:(err,next)=>{​console.log(err)}​ }​);

// //const homeFile = fs.readFileSync("home.html", "utf-8");
// console.log(path.join(__dirname, "../public"));
// const staticPath = path.join(__dirname, "../public");
// app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/senddata", upload.single("file"), (req, res) => {
  console.log("send data", req.file);
  //sendAudioData();
});

app.listen(8000, () => {
  console.log("listning the port at 8000");
});
