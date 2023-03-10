const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

//GET all workouts
router.get("/workouts", getWorkouts);

//GET a single workout
router.get("/workouts/:id", getWorkout);

//POST a new workout
router.post("/workouts", createWorkout);

//DELETE a workout
router.delete("/workouts/:id", deleteWorkout);

//UPDATe a workout
router.patch("/workouts/:id", updateWorkout);

module.exports = router;
