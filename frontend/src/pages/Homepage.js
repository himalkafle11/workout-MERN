import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/workouts");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
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
    <>
      {user && (
        <div className="bg-gray-300 ">
          <div className="md:flex md:flex-row flex flex-col gap-4 md:p-8 p-4">
            <div className="flex flex-col flex-1 gap-8">
              {workouts &&
                workouts.map((workout) => (
                  <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm className=" flex-1 " />
          </div>
        </div>
      )}
      {!user && (
        <div className="flex justify-center">
          <div className="md:p-32 py-16 px-8">
            <p className="text-4xl">404 ! Page not Found!</p>
            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
