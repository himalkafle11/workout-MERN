import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const formattedDate = () => {
    const dateTimeString = workout.createdAt;
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col border bg-white shadow-lg p-4">
      <h4 className="text-blue-700 font-extrabold uppercase mb-2">
        {workout.title}
      </h4>
      <div className="text-sm mb-4 ml-4">
        <p>
          <strong>
            Load <i>(kg)</i> :
          </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps :</strong>
          {workout.reps}
        </p>
        <p></p>
        <p>
          <strong>Date : </strong>
          {formattedDate()}
        </p>
      </div>
      <span
        className="border border-red-900 w-fit px-6 pointer bg-red-200 cursor-pointer ml-4"
        onClick={handleDelete}
      >
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
