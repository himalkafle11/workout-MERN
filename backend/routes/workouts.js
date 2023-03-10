const express = require("express");
const Workout = require("../models/workoutModel");

const router = express.Router();

//GET all workouts
router.get("/workouts", (req, res) => {
  res.json({ msg: "Get all workouts" });
});

//GET a single workout
router.get("/workouts/:id", (req, res) => {
  res.json({ msg: "Get a single workout" });
});

//POST a new workout
router.post("/workouts", async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ msg: "Post a new workout" });
});

//DELETE a workout
router.delete("/workouts/:id", (req, res) => {
  res.json({ msg: "Delete a workout" });
});

//UPDATe a workout
router.patch("/workouts/:id", (req, res) => {
  res.json({ msg: "Update a workout" });
});

module.exports = router;
