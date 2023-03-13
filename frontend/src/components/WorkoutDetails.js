import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
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
      <h4 className="text-blue-700 font-extrabold uppercase">
        {workout.title}
      </h4>
      <div className="text-sm">
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
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
