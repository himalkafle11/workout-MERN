const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");

//express app
const app = express();

//middleware
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api", workoutRoutes);
app.use("/auth", userRoutes);

//connect to db
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
