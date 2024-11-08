require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("database connection successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.listen(process.env.PORT, () => {
  console.log("listening to port 3000");
});
