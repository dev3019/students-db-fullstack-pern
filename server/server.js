const express = require("express");
const cors = require("cors")
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json());

// parsing form-data
app.use(express.urlencoded({ extended: true }));

const studentRouter = require("./routes/v1/students");
app.use("/api/v1/students", logger, studentRouter);

//render static files
app.use(express.static("public"));

app.use(logger);
app.set("view engine", "ejs");
app.get("/test", (req, res) => {
  // HTML render
  res.render("students/new", { firstName: "World" });
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});

// middleware
function logger(req, res, next) {
  console.log("server: " + req.originalUrl);
  next();
}
