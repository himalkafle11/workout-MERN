import React from "react";

const WorkoutDetails = ({ workout }) => {
  const dateTimeString = workout.createdAt;
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // months are zero-indexed, so we need to add 1
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
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
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default WorkoutDetails;
