import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="bg-white w-9/12 md:p-16 py-8 px-4">
        <h1 className="md:text-4xl text-2xl font-bold mb-8">
          Welcome to the WorkoutBuddy
        </h1>
        <p>
          Welcome to our website! We are excited to offer you a place to store
          and organize all of your important notes, gym workouts, personal data,
          and information about yourself.
          <br />
          <br /> Our platform provides you with the tools to easily create,
          edit, and access all of your data in one central location. You can
          create multiple notes, workouts, and data entries, and organize them
          all by category for quick and easy reference. Our site is designed to
          be user-friendly, with an intuitive interface that makes it easy to
          navigate and use.
          <br /> <br /> We believe that having a place to store and organize
          your information can help you stay focused, productive, and motivated.
          So start using our website today and take control of your notes,
          workouts, and personal data like never before!
        </p>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => navigate("/loginpage")}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/registerpage")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
