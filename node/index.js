const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  console.log("hey there");
  return res.render("homepage");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//to parse from data
app.use(express.urlencoded({ extended: false }));

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(5151, () => {
  console.log("server is started");
});
