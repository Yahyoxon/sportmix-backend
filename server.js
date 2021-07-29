const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const brandsRoute = require("./routes/brandsRoute");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(cors())
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/images/", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/brands", brandsRoute);
app.use(express.static('./'))

app.listen("5000", () => {
  console.log("Backend is running in http://localhost:5000");
});