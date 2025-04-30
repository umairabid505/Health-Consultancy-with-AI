import React, { useState } from "react";
import useDiagButtonHandlers from "../utils/DiagHandlers";
import { dietPlanPrompt } from "../assets/genHealthRep";
import { handleError } from "../utils/errorHandler";

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  super: 1.9,
};

const getBMIStatus = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

const DietPlanner = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    heightFeet: "",
    weight: "",
    goal: "maintain",
    activity: "moderate",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDiet, setShowDiet] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const { dietPlanApp } = useDiagButtonHandlers();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePlan = async () => {
    const { age, gender, heightFeet, weight, goal, activity } = formData;

    try {
      if (!age || !gender || !heightFeet || !weight || !goal || !activity) {
        console.log(age, gender, heightFeet, weight, goal, activity);
        throw new Error("Please fill out all fields.");
      }

      // Convert height from feet to cm
      const heightCm = parseFloat(heightFeet) * 30.48;
      const heightM = heightCm / 100;
      const weightKg = parseFloat(weight);
      const ageYears = parseFloat(age);

      const bmi = (weightKg / (heightM * heightM)).toFixed(1);
      const bmiStatus = getBMIStatus(bmi);

      // BMR (Basal Metabolic Rate) calculation
      const bmr =
        gender === "male"
          ? 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5
          : 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;

      let calories = Math.round(bmr * activityMultipliers[activity]);

      // Adjust calories based on goal
      if (goal === "lose") calories -= 500;
      if (goal === "gain") calories += 500;

      const prompt = dietPlanPrompt(age, gender, bmi, goal, calories);

      setLoading(true);

      const parsed = await dietPlanApp(prompt);
      setResult({ ...parsed, bmi, bmiStatus, calories });

      setFormData({
        age: "",
        gender: "",
        heightFeet: "",
        weight: "",
        goal: "",
        activity: "",
      });
    } catch (err) {
      console.error("Error generating plan:", err);
      if (!navigator.onLine) {
        // alert("No internet connection. Please check your network and try again.");
        err =
          "No internet connection. Please check your network and try again.";
      }
      // alert("Failed to generate diet plan. Please try again.");
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 text-center bg-white shadow-md rounded-xl space-y-4 mt-5">
        <h2 className="text-2xl font-semibold text-center">
          Diet & Fitness Planner
        </h2>

        <div className="space-y-2">
          <input
            type="number"
            name="age"
            value={formData.age}
            placeholder="Age"
            className="w-full p-2 border rounded outline-sky-500"
            onChange={handleChange}
          />

          <input
            type="number"
            name="heightFeet"
            value={formData.heightFeet}
            placeholder="Height (in feet)"
            className="w-full p-2 border rounded outline-sky-500"
            onChange={handleChange}
          />

          <input
            type="number"
            name="weight"
            value={formData.weight}
            placeholder="Weight (kg)"
            className="w-full p-2 border rounded outline-sky-500"
            onChange={handleChange}
          />

          <select
            name="gender"
            value={formData.gender}
            className="w-full p-2 border rounded outline-sky-500"
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            name="goal"
            value={formData.goal}
            className="w-full p-2 border rounded outline-sky-500"
            onChange={handleChange}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
          </select>

          <select
            name="activity"
            value={formData.activity}
            className="w-full p-2 border rounded outline-sky-500"
            onChange={handleChange}
          >
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="super">
              Super Active (hard training/manual job)
            </option>
          </select>
        </div>

        <button
          onClick={generatePlan}
          disabled={loading}
          class="rounded-md w-fit mt-5 group border-2 border-sky-500 font-medium hover:bg-gradient-to-r hover:from-[#32ebe4] hover:to-[#304ffd]  py-2 px-5 capitalize focus:outline-none hover:text-white shadow-lg hover:shadow-xl cursor-pointer "
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </div>
      <div className="mb-5  w-[100%] ">
        {result && (
          <div className="bg-white/70 p-6 rounded-lg shadow-md max-w-[1000px] mx-auto ">
            <h1 className="sm:text-2xl text-xl font-semibold text-center mb-5">
              One Day Diet & Fitness Plan
            </h1>

            <p className="sm:text-lg ">
              <span className="font-semibold">BMI:</span> {result.bmi} (
              {result.bmiStatus})
            </p>
            <p className="sm:text-lg">
              <span className="font-semibold">Calories:</span> {result.calories}{" "}
              kcal/day
            </p>

            {/* Diet Plan Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <h3 className="xs:text-lg sm:text-xl font-semibold ">
                  Diet Information
                </h3>
                <button
                  onClick={() => setShowDiet(!showDiet)}
                  className="text-blue-600 hover:underline"
                >
                  {showDiet ? "Hide" : "Show"}
                </button>
              </div>

              {showDiet && (
                <div className="mt-2 space-y-4 pr-3 ml-5">
                  {Object.entries(result.dietPlan).map(([meal, items]) => (
                    <div key={meal}>
                      <h4 className="text-lg font-semibold capitalize mb-1">
                        {meal}:
                      </h4>
                      <ul className="list-disc pl-8 space-y-1">
                        {items.map((itemObj, index) => (
                          <li key={index}>
                            <p className="font-medium">
                              {itemObj.item}:{" "}
                              <span className="font-semibold">
                                ({itemObj.calories} calories)
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Exercise Suggestions Section */}
            <div className="mt-5 ">
              <div className="flex justify-between items-center">
                <h3 className="xs:text-lg sm:text-xl font-semibold ">
                  Exercise Suggestions
                </h3>
                <button
                  onClick={() => setShowExercise(!showExercise)}
                  className="text-blue-600 hover:underline"
                >
                  {showExercise ? "Hide" : "Show"}
                </button>
              </div>
              {showExercise && (
                <ul className="list-disc pl-6 pr-4 ml-3 mt-2 space-y-1  ">
                  {result.exercises.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DietPlanner;
