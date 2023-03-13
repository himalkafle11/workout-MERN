import React, { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added");
    }
  };

  return (
    <form
      className="flex flex-col bg-white h-fit px-8 py-4 md:w-2/6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col mb-4">
        <p className="text-xl font-bold ">Hello Buddy!</p>
        <p>Add a new workout...</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Exercise Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Load <i>(in kg)</i> :
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Reps <i>( in number )</i> :
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 font-semibold text-white py-2 px-4 border border-blue-500  rounded"
      >
        Add Workout
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
