import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";

const Homepage = () => {
  const [workouts, setWorkouts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/workouts");
        const json = await response.json();

        if (response.ok) {
          setWorkouts(json);
          setError(null);
        } else {
          setError(json.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-300">
      <div className="md:p-8 p-4 m-4 flex flex-col gap-8">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
};

export default Homepage;
