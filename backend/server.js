const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api", workoutRoutes);

//listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is live at port ${process.env.PORT}`);
});
